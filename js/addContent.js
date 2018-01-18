jQuery(document).ready(function () {
        /*Object with all types of content*/
        window.content = {
         audio: [],
         video: [],
         text: []
         };

        var addForm = document.getElementById("addContent");
        $('#addContent').submit(function (e) {
            /*-----------------to prevent sending form data*/
            e.preventDefault();

            var adderName = addForm.userName.toLowerCase().value;
            var adderEmail = addForm.email.toLowerCase().value;
            var addCountry = addForm.country.toLowerCase().value;
            var addCategory = addForm.category.toLowerCase().value;
            var addFile = addForm.file.toLowerCase().value;
            var contentType = getFileType();
            var addText = $('#textContent').toLowerCase().val();
            /*-----------------filing each object every type of content*/
            var entry = {
                userName: adderName,
                email: adderEmail,
                country: addCountry,
                category: addCategory,
                file: addFile,
                contentType: contentType,
                textContent: addText
            };
            if (contentType === 'text'){
                window.content.text.push(entry);
            }
            if (contentType === 'video'){
                window.content.video.push(entry);
            }
            if (contentType === 'audio'){
                window.content.audio.push(entry);
            }
            if (contentType === undefined){
                alert('unknown type of file');
            }

        });
            /*----------------------------------ERROR and validate function----------------------*/
            $('#addContent-text-submit').on('click', function (e) {
                e.preventDefault();

            function showError(container, errorMessage) {
                container.className = 'error';
                var msgElem = document.createElement('span');
                msgElem.className = "error-message";
                msgElem.innerHTML = errorMessage;
                container.appendChild(msgElem);
            }

            function resetError(container) {
                container.className = '';
                if (container.lastChild.className === "error-message") {
                    container.removeChild(container.lastChild);
                }
            }

            function validate(addContent) {
                var elems = addContent.elements;

                resetError(elems.userName.parentNode);
                if (!elems.userName.value) {
                    showError(elems.userName.parentNode, ' Please, enter your Name or nickName');
                }
                resetError(elems.message.parentNode);
                if (!elems.message.value) {
                    showError(elems.message.parentNode, ' Text is missing');
                }

            }
            });

    document.getElementById("addContent-text-submit").addEventListener('click',validate());
        /*-------------------checking if file`s type is available*/
        function extCheck(param, array) {
            return array.indexOf(param) !== -1;
        }

        function getFileType() {
            var fileType;
            var file = document.getElementById("addFile").files[0],
                ext,
                parts = file.name.split('.');
            if (parts.length > 1) ext = parts.pop();
            /*list of known file type*/
            var extType = {
                text: ['doc', 'txt', 'docx', 'pdf', 'xps'],
                video: ['mpeg', 'mp4', 'webm'],
                audio: ['mp3', 'wav', 'ogg']
            };

            if (extCheck(ext, extType.text)) fileType = 'text';
            if (extCheck(ext, extType.video)) fileType = 'video';
            if (extCheck(ext, extType.audio)) fileType = 'audio';

            return fileType;
        }
        /*----------------checking of file type before sending form data*/
        document.getElementById("addFile").addEventListener('change',getFileType());
    });