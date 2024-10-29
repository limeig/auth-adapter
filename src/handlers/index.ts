import * as children  from './children';
import * as reviews  from './reviews';
import * as subjects  from './subjects';
import * as tasks  from './tasks';


export default {
    handlers: {
        ...children,
        ...tasks,
        ...subjects,
        ...reviews,
    }
}