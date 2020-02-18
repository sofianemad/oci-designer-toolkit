/*
** Copyright (c) 2020, Oracle and/or its affiliates. All rights reserved.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/
console.info('Loaded OKIT Common Javascript');

function jqId(id) {
    return '#' + safeId(id);
}

function d3Id(id) {
    return '#' + safeId(id);
}

function safeId(id) {
    return id.replace( /(:|\.|\[|\]|,|=|@)/g, "\\$1" );
    //return id;
}

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generatePassword(length=30, lowercase=1, uppercase=1, numeric=1, special=0) {
    let min_length = 12;
    let lowercase_chars = 'abcdefghijklmnopqrstuvwxyz';
    let uppercase_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let numeric_chars = '0123456789';
    let special_chars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let all_chars = lowercase_chars + uppercase_chars + numeric_chars + special_chars;
    let chars_array = [lowercase_chars, uppercase_chars, numeric_chars, special_chars, all_chars];
    // Force Positive Numbers
    length = Math.max(Math.abs(length), min_length);
    lowercase = Math.abs(lowercase);
    uppercase = Math.abs(uppercase);
    numeric = Math.abs(numeric);
    special = Math.abs(special);
    // Calculate Sizes
    let any = Math.max((length - lowercase - uppercase - numeric - special), 0);
    let count_array = [lowercase, uppercase, numeric, special, any];
    // Generate
    let generatedPassword = shuffle(count_array.map(function(len, i) { return Array(len).fill(chars_array[i]).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('') }).concat().join('').split('')).join('');

    return generatedPassword;
}

function standardiseId(id) {
    return id.r.replace(/\./g, '-');
}

function getTimestamp() {
    console.groupCollapsed('Get TimeStamp');
    let dateTimeNow = new Date();
    let year   = '' + dateTimeNow.getFullYear();
    let month  = ('00' + dateTimeNow.getMonth()).slice(-2);
    let day    = ('00' + dateTimeNow.getDay()).slice(-2);
    let hour   = ('00' + dateTimeNow.getHours()).slice(-2);
    let minute = ('00' + dateTimeNow.getMinutes()).slice(-2);
    let second = ('00' + dateTimeNow.getSeconds()).slice(-2);
    console.info('Year      : ' + year);
    console.info('Month     : ' + month);
    console.info('Day       : ' + day);
    console.info('Hour      : ' + hour);
    console.info('Minute    : ' + minute);
    console.info('Second    : ' + second);
    let timestamp = year + month + day + '-' + hour + minute + second;
    console.info('Timestamp : ' + timestamp);
    console.groupEnd();
    return timestamp;
}

function titleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

/*
** Set cursor icons
 */
function setBusyIcon() {
    $('*').css('cursor', 'wait');
}

function unsetBusyIcon() {
    $('*').css('cursor', 'auto');
}

/*
** Cookie Processing
 */

function setCookie(cname, cvalue, exdays=180) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
