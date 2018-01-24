jQuery(document).ready(function () {
    var getId = function(id) {
        return document.getElementById(id);
    };
    /*Object with all types of content*/
    window.content = {
        audio: [],
        video: [],
        text: []
    };

    var addForm = getId("addContent");
    $('#addContent').submit(function (e) {
        e.preventDefault();
        /*-----------------to prevent sending form data*/

        var adderName = addForm.userName.value;
        var adderEmail = addForm.email.value;
        var addCountry = addForm.country.value;
        var addCategory = addForm.category.value;
        var addFile = addForm.file.value;
        var contentType = getFileType();
        var addText = $('#textContent').val();
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
            alert('text type of file');
            window.content.text.push(entry);
        }
        if (contentType === 'video'){
            alert('video type of file');
            window.content.video.push(entry);
        }
        if (contentType === 'audio'){
            alert('audio type of file');
            window.content.audio.push(entry);
        }
        if (contentType === undefined){
            alert('unknown type of file');
        }
    });
    /*-------------------checking if file`s type is available---------------------*/
    function extCheck(param, array) {
        return array.indexOf(param) !== -1;
    }

    function getFileType() {
        var fileType;
        var ext, file, parts;
        file = getId("addFile").files[0];
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

    /*----------------------------------ERROR and validate function----------------------*/
    $('#regForm').submit(function (e) {
        if(validation) {
            e.preventDefault();
            validation("regForm");
        }
    });

    var validation = function validate(formId) {
        var elems = document.getElementById(formId);

        if (elems.userName){
            resetError(elems.userName.parentNode);
            if (!elems.userName.value) {
                showError(elems.userName.parentNode, ' Please, enter your Name or nickName');
            }
        }

        if (elems.email){
            resetError(elems.email.parentNode);
            if (!elems.email.value) {
                showError(elems.email.parentNode, ' Please, enter your e-mail ');
            }
        }

        if (elems.tel){
            resetError(elems.tel.parentNode);
            if (!elems.tel.value) {
                showError(elems.tel.parentNode, ' Please, enter your phone number ');
            }
        }

        if (elems.password){
            resetError(elems.password.parentNode);
            if (!elems.password.value) {
                showError(elems.password.parentNode, ' Укажите пароль.');
            } else if (elems.password.value !== elems.password2.value) {
                showError(elems.password.parentNode, ' Пароли не совпадают.');
            }
        }

        if (elems.country){
            resetError(elems.country.parentNode);
            if (!elems.email.value) {
                showError(elems.country.parentNode, ' Please, enter your country ');
            }
        }

        if (elems.category){
            resetError(elems.category.parentNode);
            if (!elems.email.value) {
                showError(elems.category.parentNode, ' Please, enter category ');
            }
        }

        if (elems.message) {
            resetError(elems.message.parentNode);
            if (!elems.message.value) {
                showError(elems.message.parentNode, ' Text is missing');
            }
        }
    };

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
});