class DOMHelper {
    static clearElementListeners(element) {  // remove memory leak by replacing element, otherwise eventListener will cause memory leak
        const clonedElement = element.cloneNode(true);  // true means a deep clone
        element.replaceWith(clonedElement);
        return clonedElement;
    }

    static moveElement(elementId, newDestinationSelector) {
        const element = document.getElementById(elementId);
        const destinationElement = document.querySelector(newDestinationSelector);
        destinationElement.append(element);  // this will not copy the element, it will be moved
    }
}

class Component {
    constructor(hostElementId, insertBefore = false) {
        if(hostElementId) {
            this.hostElement = document.getElementById(hostElementId);
        } else {
            this.hostElement = document.body;
        }
        this.insertBefore = insertBefore;
    }

    detach = () => {
        if(this.element) {
            this.element.remove();
            // would do the following for older browsers
            //this.element.parentsElement.removeChild(this.element); 
        } 
    }

    attach() {
        this.hostElement.insertAdjacentElement(
            this.insertBefore ? 'afterbegin' : 'beforeend', 
            this.element
        );
    }
}

class ToolTip extends Component{
    constructor(closeNotifierFunction) {
        super();  // use defaults in parent class
        this.closeNotifier = closeNotifierFunction;
        this.create();
    }

    closeTooltip = () => {
        this.detach();
        this.closeNotifier();
    }

    create() {
        const tooltipElement = document.createElement('div');
        tooltipElement.className = 'card';
        tooltipElement.textContent = 'DUMMY!';
        tooltipElement.addEventListener('click', this.closeTooltip);
        this.element = tooltipElement;
    }
}

class ProjectItem {
    hasActiveTooltip = false;

    constructor(id, updateProjectListsFunction, type) {
        this.id = id;
        this.updateProjectListsHandler = updateProjectListsFunction;
        this.connectMoreInfoButton();
        this.connectSwitchButton(type);
    }

    showMoreInfoHandler() {
        if(this.hasActiveTooltip) {
            return;
        }

        const tooltip = new ToolTip(() => {
            this.hasActiveTooltip = false;
        });

        tooltip.attach();
        this.hasActiveTooltip = true;
    }

    connectMoreInfoButton() {
        const projectItemElement = document.getElementById(this.id);
        const moreInfoBtn = projectItemElement.querySelector('button:first-of-type');
        moreInfoBtn.addEventListener('click', this.showMoreInfoHandler);
    }

    connectSwitchButton(type) {
        const projectItemElement = document.getElementById(this.id);
        let switchBtn = projectItemElement.querySelector('button:last-of-type'); // access the finish button which is the last one in the html file
        switchBtn = DOMHelper.clearElementListeners(switchBtn);  // will remove event listeners memory leaks, as this method replaces the element with the newer version of itself
        switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
        switchBtn.addEventListener('click', this.updateProjectListsHandler.bind(null, this.id));
    }

    update(updateProjectListsFn, type) {
        this.updateProjectListsHandler = updateProjectListsFn;
        this.connectSwitchButton(type);
    }
}

class ProjectList {
    projects = [];

    constructor(type) {
        this.type = type;

        const prjItems = document.querySelectorAll(`#${type}-projects li`);
        for(const prjItem of prjItems) {
            this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type));  // id is every li id in the html of the list
        }
        console.log(this.projects);
    }

    setSwitchHandlerFunction(switchHandlerFunction) {
        this.switchHandler = switchHandlerFunction;
    }

    addProject(project) {
        this.projects.push(project);
        DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
        project.update(this.switchProject.bind(this), this.type);  // change function to be called when button is clicked, and need to type to let update method know if item is in active or finished list
    }

    switchProject(projectId) {
        this.switchHandler(this.projects.find(p => p.id === projectId));
        //const projectIndex = this.projects.findIndex(p => p.id === projectId);
        //this.projects.splice(projectIndex, 1);
        // does same as above two lines
        this.projects = this.projects.filter(p => p.id !== projectId);
    }
}

class App {
    static init() {
        const activeProjectList = new ProjectList('active');
        const finishedProjectList = new ProjectList('finished');

        activeProjectList.setSwitchHandlerFunction(
            finishedProjectList.addProject.bind(finishedProjectList)
        );

        finishedProjectList.setSwitchHandlerFunction(
            activeProjectList.addProject.bind(activeProjectList)
        );
    }
}

App.init();