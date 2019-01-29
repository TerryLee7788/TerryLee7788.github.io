/*****
 * API DOC:
 * @author: terry
 * @parameter opts {Object}
 *     @property start_month {String} - The generate start month
 *          - Example: '2016/01' or '2016-01'
 *     @property range {Number} (default: 24) - Generate month range.
 *
 *****/

const generateYearAndMonth = (opts) => {

    const NOW = new Date(),
        SETTING = {
            VERSION: '1.0.0',
            NOW_YEAR: NOW.getFullYear(),
            NOW_MONTH: NOW.getMonth() + 1,
            RANGE: opts.range || 24,
        },
        PRIVATE_METHODS = {

            SPLITE_START_MONTH: () => {

                const splitString = opts.start_month.split(/[-/]/g),
                    startYear = +splitString[0],
                    startMonth = +splitString[1],
                    yearGap = SETTING.NOW_YEAR - startYear,
                    restOfMonthsForFirstYear = (12 - startMonth) + 1;

                return {
                    yearGap,
                    startYear,
                    restOfMonthsForFirstYear
                };

            },

            INIT: () => {

                const myObj = PRIVATE_METHODS.SPLITE_START_MONTH();
                let resultArray = [];

                // for years
                for (let i = 0; i <= myObj.yearGap; i++) {

                    const nowYear = myObj.startYear + i;
                    // console.log('nowYear: ', nowYear);

                    // 準備一下月份~
                    let j = i === 0 ? (12 - myObj.restOfMonthsForFirstYear + 1) : 1;
                    // for max month
                    const maxMonth = nowYear === SETTING.NOW_YEAR ? SETTING.NOW_MONTH : 12;
                    for (j; j <= maxMonth; j++) {

                        // 可以自己定義 select components 的資料結構
                        const forSelectObj = {
                            label: `${nowYear}/${j}`,
                            text: `${nowYear}/${j}`,
                        };

                        resultArray.push(forSelectObj);

                        // console.log('j', j);

                    }

                }

                // 如果 resultArray 大於 range~
                if (resultArray.length > SETTING.RANGE) {

                    resultArray = resultArray.slice(resultArray.length - SETTING.RANGE, resultArray.length);

                }

                return resultArray;

            }

        },
        PUBLIC = {
            version: SETTING.VERSION
        };

    return PRIVATE_METHODS.INIT();

};

module.exports = generateYearAndMonth;
