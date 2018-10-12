exports.config = {
    visaRegEx         : /^(?:4)[0-9]*$/,
    amexpRegEx        : /^(?:3[47])[0-9]*$/,
    mastercardRegEx   : /^(?:5[1-5]|2[2-7]{1}2[0-9]{1}[0-9]{2})[0-9]*/,
    discovRegEx       : /^(?:6(?:011|5{2}))[0-9]*/,
    dinersclub        : /^(?:36|3[89]|3[0-5]{2})[0-9]*/,
    dinersclubEnroute : /^(?:2014|2149)[0-9]*/,
    jcbRegEx          : /^(?:2131|1800|35[0-9]{3})[0-9]*/,
    unionPay          : /^(?:62)[0-9]*/,
};
