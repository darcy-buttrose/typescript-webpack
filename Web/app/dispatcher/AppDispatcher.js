import * as flux from 'flux';
export var ActionType;
(function (ActionType) {
    ActionType[ActionType["Create"] = 0] = "Create";
    ActionType[ActionType["Complete"] = 1] = "Complete";
    ActionType[ActionType["Destroy"] = 2] = "Destroy";
    ActionType[ActionType["DestroyComplete"] = 3] = "DestroyComplete";
    ActionType[ActionType["ToggleComplete"] = 4] = "ToggleComplete";
    ActionType[ActionType["UndoComplete"] = 5] = "UndoComplete";
    ActionType[ActionType["UpdateText"] = 6] = "UpdateText";
    ActionType[ActionType["CompleteAll"] = 7] = "CompleteAll";
})(ActionType || (ActionType = {}));
export var AppDispatcher = new flux.Dispatcher();
