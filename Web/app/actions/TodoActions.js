import { AppDispatcher, ActionType } from "../dispatcher/AppDispatcher";
var TodoActions = {
    /**
     * @param  {string} text
     */
    create: (text) => {
        AppDispatcher.dispatch({
            actionType: ActionType.Create,
            text: text
        });
    },
    /**
     * @param  {string} id The ID of the ToDo item
     * @param  {string} text
     */
    updateText: (id, text) => {
        AppDispatcher.dispatch({
            actionType: ActionType.UpdateText,
            id: id,
            text: text
        });
    },
    /**
     * Toggle whether a single ToDo is complete
     * @param  {object} todo
     */
    toggleComplete: (todo) => {
        var id = todo.id;
        var actionType = todo.done ?
            ActionType.UndoComplete :
            ActionType.Complete;
        AppDispatcher.dispatch({
            actionType: actionType,
            id: id
        });
    },
    /**
     * Mark all ToDos as complete
     */
    toggleCompleteAll: () => {
        AppDispatcher.dispatch({
            actionType: ActionType.CompleteAll
        });
    },
    /**
     * @param  {string} id
     */
    destroy: (id) => {
        AppDispatcher.dispatch({
            actionType: ActionType.Destroy,
            id: id
        });
    },
    /**
     * Delete all the completed ToDos
     */
    destroyCompleted: () => {
        AppDispatcher.dispatch({
            actionType: ActionType.DestroyComplete
        });
    }
};
export default TodoActions;
