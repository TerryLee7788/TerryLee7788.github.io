const assert = require('assert'),
    cardReg = require('./cardCode');

describe('CreditCard TEST', () => {

    it('Visa', () => {

        const cardCode = '4242424242424242';

        assert.ok(!!cardCode.match(cardReg.config.visaRegEx));

    });

    it('Visa (debit)', () => {

        const cardCode = '4000056655665556';
        assert.ok(!!cardCode.match(cardReg.config.visaRegEx));

    });

    it('Mastercard', () => {

        const cardCode = '5555555555554444';
        assert.ok(!!cardCode.match(cardReg.config.mastercardRegEx));

    });

    it('Mastercard (2-series)', () => {

        const cardCode = '2223003122003222';
        assert.ok(!!cardCode.match(cardReg.config.mastercardRegEx));

    });

    it('Mastercard (debit)', () => {

        const cardCode = '5200828282828210';
        assert.ok(!!cardCode.match(cardReg.config.mastercardRegEx));

    });

    it('Mastercard (prepaid)', () => {

        const cardCode = '5105105105105100';
        assert.ok(!!cardCode.match(cardReg.config.mastercardRegEx));

    });

    it('American Express 1', () => {

        const cardCode = '378282246310005';
        assert.ok(!!cardCode.match(cardReg.config.amexpRegEx));

    });

    it('American Express 2', () => {

        const cardCode = '371449635398431';
        assert.ok(!!cardCode.match(cardReg.config.amexpRegEx));

    });

    it('Discover 1', () => {

        const cardCode = '6011111111111117';
        assert.ok(!!cardCode.match(cardReg.config.discovRegEx));

    });

    it('Discover 2', () => {

        const cardCode = '6011000990139424';
        assert.ok(!!cardCode.match(cardReg.config.discovRegEx));

    });

    it('Diners Club 1', () => {

        const cardCode = '30569309025904';
        assert.ok(!!cardCode.match(cardReg.config.dinersclub));

    });

    it('Diners Club 2', () => {

        const cardCode = '38520000023237';
        assert.ok(!!cardCode.match(cardReg.config.dinersclub));

    });

    it('JCB', () => {

        const cardCode = '3566002020360505';
        assert.ok(!!cardCode.match(cardReg.config.jcbRegEx));

    });

    it('UnionPay', () => {

        const cardCode = '6200000000000005';
        assert.ok(!!cardCode.match(cardReg.config.unionPay));

    });

});
