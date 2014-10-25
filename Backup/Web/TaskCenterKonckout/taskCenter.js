

var createTask = {

    addTask: function () {

        var a =   new TaskSingel("https://img.mingdao.com/UserAvatar/24X24/e61ce5b8-de87-4cd7-8a0c-fd927e8f957e.jpg", "Name1", "2013-4-3");
       // var a = { imgsrc: "https://img.mingdao.com/UserAvatar/24X24/e61ce5b8-de87-4cd7-8a0c-fd927e8f957e.jpg", taskName: "ddsx", taskTime: "2013-2-3" };
        ViewModel.tasks.unshift(a);
    }
}