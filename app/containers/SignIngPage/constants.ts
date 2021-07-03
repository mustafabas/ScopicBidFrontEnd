/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
enum ActionTypes {
  CHANGE_USERNAME = 'boilerplate/SigInPage/CHANGE_USERNAME',
  CHANGE_PASSWORD = 'boilerplate/SigInPage/CHANGE_PASSWORD',
  LOAD_USER = 'boilerplate/SigInPage/LOAD_USER',
  SING_IN='boilerplate/SigInPage/SING_IN',
  USER_NOT_FOUND = 'boilerplate/SigInPage/USER_NOT_FOUND',
}

export default ActionTypes;
