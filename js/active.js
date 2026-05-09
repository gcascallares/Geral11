$(function () {
  var note = $("#note"),
      ts = new Date(2026, 4, 17, 13, 30, 0);

  $("#countdown").countdown({
    timestamp: ts,
    callback: function (days, hours, minutes, seconds, finished) {

      // cuando termina
      if (finished) {
        note.html("🎉 ¡Es hoy!");
        return;
      }

      var message = "";

      message += days + " día" + (days == 1 ? "" : "s") + ", ";
      message += hours + " hora" + (hours == 1 ? "" : "s") + ", ";
      message += minutes + " minuto" + (minutes == 1 ? "" : "s") + " y ";
      message += seconds + " segundo" + (seconds == 1 ? "" : "s");

      note.html(message);
    }
  });
});
