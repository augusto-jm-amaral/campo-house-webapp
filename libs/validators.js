module.exports = function(app) {
    var validators = {
        // Valida senha com no minimo:
        // 1 Letra maiuscula, 1 minuscula, 1 numerico
        isPassword: function(value) {
            // var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,20}$/;
            var passw = /.{6,20}/;
            if (value.match(passw)) {
                return true;
            } else {
                return false;
            }
        },
        // Valida nome com acentuação
        isName: function(value) {
            var passw = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
            if (value.match(passw)) {
                return true;
            } else {
                return false;
            }
        }
    };

    return {
        customValidators: validators
    };
};
