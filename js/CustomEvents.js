$( document ).ready(function() {

    $('.awesome-tooltip').tooltip({
        placement: 'left'
    });  
    $('body').scrollspy({ 
        target: '#mainnav', 
        offset: 000
    });  
    /* CSS Tricks smooth scrolling : https://css-tricks.com/snippets/jquery/smooth-scrolling/ */
    $('a[href*=\\#]:not([href=\\#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {                   
                $('html, body').animate({
                    scrollTop: target.offset().top + 1
                }, 500);
                return false;
            }
        }
    });


//Configuração para envio de e-mail   

    $("input[name=telefone]") //Mascara do Campo telefone
        .mask("(99) 9999-9999?9")
        .focusout(function (event) {  
            var target, phone, element;  
            target = (event.currentTarget) ? event.currentTarget : event.srcElement;  
            phone = target.value.replace(/\D/g, '');
            element = $(target);  
            element.unmask();  
            if(phone.length > 10) {  
                element.mask("(99) 99999-999?9");  
            } else {  
                element.mask("(99) 9999-9999?9");  
            }  
    });        

    $('form[name="mailform"]').submit(function() { //Antes de enviar
        $('.topic.contato .container .btn-primary').prop("disabled", true);

        let form = $('form[name="mailform"').serializeArray();
        let campos = $(form).length;
        let camposArray = {};

        for (var i = 0; i < campos; i++) {
            // camposArray.push($(form)[i].value);
            camposArray[form[i].name] = form[i].value;
        }

        console.log(camposArray);

        let formJSON = JSON.stringify(camposArray);

        $.post("sender.php",{
            json:       formJSON
        },function(data,status){            
            $('.topic.contato .container .alert').hide();

            if(data==1){
                $('.topic.contato .container .alert').addClass('alert-success');
                $('.topic.contato .container .alert').html('<span>Seu e-mail foi enviado, iremos responder assim que possível.</span>');
                $('.topic.contato .container .alert').show("slow");
                $('.topic.contato .container .btn-primary').prop("disabled", false);
                $("form[name=mailform]")[0].reset();
                $("form[name=mailform]").find('input, textarea').val('');
            }else{
                $('.topic.contato .container .alert').addClass('alert-warning');
                $('.topic.contato .container .alert').html('<span>Seu e-mail não pôde foi enviado, tente novamente mais tarde.</span>');
                $('.topic.contato .container .alert').show("slow");
                $('.topic.contato .container .btn-primary').prop("disabled", false);                
                console.error('Data:'+  data);
                console.error('Status'+ status);                
            }

        });

    });

});