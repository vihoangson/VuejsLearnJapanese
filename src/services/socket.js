module.exports = {
    connect: function() {
        console.log("Connected..");
    },
    broadcast: function(e) {
        var room = this.$store.getters.get_current_room;
        if (room.id === e.room_id) this.$store.dispatch("addTask", e);
        else {
            this.$store.dispatch("notReadMessage", e);
        }
    }
};
