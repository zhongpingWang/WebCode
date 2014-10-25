<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="taskCenter.aspx.cs" Inherits="Web.TaskCenterKonckout.taskCenter" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../jquery/jquery-1.8.3.min.js" type="text/javascript"></script>
    <script src="../koJs/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="taskCenter.js" type="text/javascript"></script>
    <script src="../koJs/knockout.mapping-latest.js" type="text/javascript"></script>
    <style type="text/css">
        #ToCompleteTheTask li
        {
            float: left;
            list-style-type: none;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <ul id="ToCompleteTheTask">
            <li>待完成<span data-bind="text:tasks().length"></span></li>
            <li>
                <select data-bind="foreach: optionValues,value:selectedOptionValue2 ">
                    <option data-bind="text: text,value:index " />
                </select>
            </li>
        </ul>
        <table style="width: 500px;">
            <tbody data-bind='template: { name: "ToCompleteTheTaskTemplate", foreach: tasks }'>
            </tbody>
        </table>
        <span onclick="createTask.addTask()">add</span> <span data-bind="click:addTask">add2</span>
        <span data-bind="click:update">update</span>
    </div>
    <button type="button" data-bind="click:sortItems">
        Sort</button>
    </form>
    <script type="text/html" id="ToCompleteTheTaskTemplate">
        
        <tr>
            <td><img data-bind="attr:{src:imgsrc}"/></td> 
            <td><span data-bind="text:taskName"></span></td>
             <td><span data-bind="text:taskTime"></span>  </td>
            <td><a href="#" data-bind="click: function() { ViewModel.removeGift($data) }">Delete</a></td>  
            <td><a href="#" data-bind="click: function() { ViewModel.updateTask($data) }">update</a></td>   
        </tr>
        

    </script>
    <script type="text/javascript">

        function TaskSingel(img, Name, Time) { 
            this.imgsrc = ko.observable(img);
            this.taskName = ko.observable(Name);
            this.taskTime = ko.observable(Time); 
        }

        //   var taskAlls = [{ imgsrc: "https://img.mingdao.com/UserAvatar/24X24/e61ce5b8-de87-4cd7-8a0c-fd927e8f957e.jpg", taskName: "Test1", taskTime: "2013-2-3" }, { imgsrc: "https://img.mingdao.com/UserAvatar/24X24/e61ce5b8-de87-4cd7-8a0c-fd927e8f957e.jpg", taskName: "Test2", taskTime: "2013-12-3" }, { imgsrc: "https://img.mingdao.com/UserAvatar/24X24/e61ce5b8-de87-4cd7-8a0c-fd927e8f957e.jpg", taskName: "Test3", taskTime: "2013-4-3" }, { imgsrc: "https://img.mingdao.com/UserAvatar/24X24/e61ce5b8-de87-4cd7-8a0c-fd927e8f957e.jpg", taskName: "Test4", taskTime: "2013-2-30"}];

        var taskAlls = [new TaskSingel("https://img.mingdao.com/UserAvatar/24X24/e61ce5b8-de87-4cd7-8a0c-fd927e8f957e.jpg", "aa", "2013-2-3"),
            new TaskSingel("https://img.mingdao.com/UserAvatar/24X24/e61ce5b8-de87-4cd7-8a0c-fd927e8f957e.jpg", "zz", "2013-7-3"),
            new TaskSingel("https://img.mingdao.com/UserAvatar/24X24/e61ce5b8-de87-4cd7-8a0c-fd927e8f957e.jpg", "zz", "2013-7-3"),
            new TaskSingel("https://img.mingdao.com/UserAvatar/24X24/e61ce5b8-de87-4cd7-8a0c-fd927e8f957e.jpg", "zz", "2013-7-3"),
            new TaskSingel("https://img.mingdao.com/UserAvatar/24X24/e61ce5b8-de87-4cd7-8a0c-fd927e8f957e.jpg", "aa", "2013-2-3")
        ];

        var ViewModel = {

            tasks: ko.observableArray(taskAlls),

            optionValues: [{ text: "按时间", index: 1 }, { text: "按名称", index: 2 }, { text: "按加星", index: 3}],

            selectedOptionValue2: ko.observable(1),

            removeGift: function (task) {
                this.tasks.remove(task);
            },
            addTask: function () {

                var a = new TaskSingel("https://img.mingdao.com/UserAvatar/24X24/e61ce5b8-de87-4cd7-8a0c-fd927e8f957e.jpg", "Test1", "2013-8-3");
                this.tasks.push(a);
            },

            updateTask: function (task) {
                task.taskName("dfdfdf");
            },

            update: function () {
                this.tasks()[4]['a']("2345678");
                //   this.tasks([{ imgsrc: "https://img.mingdao.com/UserAvatar/24X24/e61ce5b8-de87-4cd7-8a0c-fd927e8f957e.jpg", taskName: "Test1", taskTime: "2013-2-3"}]);
            },

            sortItems: function () {
                this.tasks(this.tasks.sort(this.sortFunction)); 
            }
        }


        ViewModel.sortFunction = function (a, b) {
            return a.taskName().toLowerCase() > b.taskName().toLowerCase() ? 1 : -1;
        };

        //        ViewModel.sortedInstances = ko.dependentObservable(function () {
        //            if (this.selectedOptionValue2() == 2) {
        //                return this.tasks.slice().sort(this.sortFunction);
        //            } else {
        //                return this.tasks();
        //            }

        //        }, ViewModel);



        ViewModel.selectedOptionValue2.subscribe(function (data) {
            if (data == 1) {
                ViewModel.tasks(ViewModel.tasks.sort(function(a,b) {
                    return a.taskTime() > b.taskTime()  ? 1 : -1;
                }));
            } else {
                ViewModel.tasks(ViewModel.tasks.sort(ViewModel.sortFunction));
            }
           
        });

        //        ViewModel.update = ko.computed(function() {
        //           // ViewModel.tasks()[0].taskName = "1234567890";
        //        }); 
        ko.applyBindings(ViewModel);
    </script>
</body>
</html>
