
var _nav = {

    moveLeft: function (obj) {
        obj.insertBefore(obj.prev());
    },
    moveRight: function (obj) {
        obj.insertAfter(obj.next());
    },

}; //class