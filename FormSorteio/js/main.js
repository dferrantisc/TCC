(function($) {
    "use strict";

    // Form
    var contactForm = function() {
        if ($("#contactForm").length > 0) {
            $("#contactForm").validate({
                rules: {
                    name: "required",
                    subject: "required",
                    email: {
                        required: true,
                        email: true,
                    },
                    message: {
                        required: true,
                        minlength: 5,
                    },
                },
                messages: {
                    name: "Por Favor insira seu Nome!",
                    cpf: "Por Favor insira seu CPF!",
                    telefone: "Por Favor isira seu Telefone!",
                    datanascimento: "Por Favor insira sua Data de Nascimento!",
                    email: "Por Favor insira um E-mail Válido!",
                },
                /* submit via ajax */

                submitHandler: function(form) {
                    var $submit = $(".submitting"),
                        waitText = "Submitting...";

                    $.ajax({
                        type: "POST",
                        url: "php/sendEmail.php",
                        data: $(form).serialize(),

                        beforeSend: function() {
                            $submit.css("display", "block").text(waitText);
                        },
                        success: function(msg) {
                            if (msg == "OK") {
                                $("#form-message-warning").hide();
                                setTimeout(function() {
                                    $("#contactForm").fadeIn();
                                }, 1000);
                                setTimeout(function() {
                                    $("#form-message-success").fadeIn();
                                }, 1400);

                                setTimeout(function() {
                                    $("#form-message-success").fadeOut();
                                }, 8000);

                                setTimeout(function() {
                                    $submit.css("display", "none").text(waitText);
                                }, 1400);

                                setTimeout(function() {
                                    $("#contactForm").each(function() {
                                        this.reset();
                                    });
                                }, 1400);
                            } else {
                                $("#form-message-warning").html(msg);
                                $("#form-message-warning").fadeIn();
                                $submit.css("display", "none");
                            }
                        },
                        error: function() {
                            $("#form-message-warning").html(
                                "Something went wrong. Please try again."
                            );
                            $("#form-message-warning").fadeIn();
                            $submit.css("display", "none");
                        },
                    });
                }, // end submitHandler
            });
        }
    };
    contactForm();
})(jQuery);