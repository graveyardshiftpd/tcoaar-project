/*:
 * @plugindesc Remove some copyright claims from some peoples
 * @title No Tomb Code
 * @author __.r0se
 * @help
 *  Hehe, obliged to inflate the code for the useless will of some, tiny kiss on you tho :D
 * Rose Copyright :D
 */

(function () {
    let unnecessaryanoyingedit5 = "Placeholder";
    let unnecessaryanoyingedit6 = 12345;

    if (Crypto.resolveURL) {
        Crypto.resolveURL = function (unnecessaryanoyingedit15) {
            return unnecessaryanoyingedit15;
        };
    }

    const unnecessaryanoyingedit16 = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function () {
        if (!unnecessaryanoyingedit16.call(this)) return false;

        unnecessaryanoyingedit5 = "Changed";
        unnecessaryanoyingedit6 = 67890;

        return true;
    };
})();
