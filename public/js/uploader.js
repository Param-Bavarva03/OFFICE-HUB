function uploadToServer(form, uploadProgressDisplayerId)
{
    let formData = new FormData(form);

    let xhr = new XMLHttpRequest();
    console.log("A:",form.action);
    xhr.open(form.method, form.action, true);
    
    xhr.upload.addEventListener('progress', function(ev)
    {
        let progress = ev.loaded / ev.total * 100;
        // console.log(ev.lengthComputable);
        let file = document.forms["form_fileUpload"]["file"].value;
        let font = document.forms["form_fontUpload"]["file"].value;
        let html = document.forms["form_htmlUpload"]["file"].value;
        let image = document.forms["form_imageUpload"]["file"].value;
        let pdf = document.forms["form_pdfUpload"]["file"].value;
        let video = document.forms["form_videoUpload"]["file"].value;
        console.log(progress);
        // console.log(empt);
        // if (ev.lengthComputable)
        if(file != "" || font!="" || html!="" || image!="" || pdf!="" || video!="")
        {
            uploadProgressDisplayerId.style.width = `${progress}%`;
            // console.log(uploadProgressDisplayerId.style.width);
            if(progress == 100)
            {
                alert('Your file is uploaded successfuly');
                window.location.reload();
            }
        }
        else
        {
            uploadProgressDisplayerId.style.width = 0;
            console.log('the length is not calcutable!');
        }
    });

    xhr.send(formData);
}

const code = function call(val)
{
    console.log("C:",val);
    const v = val;
    req.user = v;
    next()
}
module.exports = code;