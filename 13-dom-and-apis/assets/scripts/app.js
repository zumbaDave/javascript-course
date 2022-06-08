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
        element.scrollIntoView({behavior: 'smooth'});
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
    constructor(closeNotifierFunction, text, hostElementId) {
        super(hostElementId);
        this.closeNotifier = closeNotifierFunction;
        this.text = text;
        this.create();
    }

    closeTooltip = () => {
        this.detach();
        this.closeNotifier();
    }

    create() {
        const tooltipElement = document.createElement('div');
        tooltipElement.className = 'card';
        const tooltipTemplate = document.getElementById('tooltip');
        const tooltipBody = document.importNode(tooltipTemplate.content, true);  // get html inside of template tag, true means we really do get everything inside of it
        tooltipBody.querySelector('p').textContent = this.text;
        tooltipElement.append(tooltipBody);
        
        const hostElPosLeft = this.hostElement.offsetLeft;
        const hostElPosTop = this.hostElement.offsetTop;
        const hostElHeight = this.hostElement.clientHeight;
        const parentElementScrolling = this.hostElement.parentElement.scrollTop;

        const x = hostElPosLeft + 20;
        const y = hostElPosTop + hostElHeight - parentElementScrolling - 10;

        tooltipElement.style.position = 'absolute';
        tooltipElement.style.left = x + 'px';
        tooltipElement.style.top = y + 'px';

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

        const projectElement = document.getElementById(this.id);
        const tooltipText = projectElement.dataset.extraInfo;
        const tooltip = new ToolTip(() => {
            this.hasActiveTooltip = false;
        }, tooltipText, this.id);

        tooltip.attach();
        this.hasActiveTooltip = true;
    }

    connectMoreInfoButton() {
        const projectItemElement = document.getElementById(this.id);
        const moreInfoBtn = projectItemElement.querySelector('button:first-of-type');
        moreInfoBtn.addEventListener('click', this.showMoreInfoHandler.bind(this));
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

        // can use javascript to create javascript
        //const someScript = document.createElement('script');
        //someScript.textContent = 'alert("Hi there");';
        //document.head.append(someScript);

        //this.startAnalytics();
        //document
        //    .getElementById('start-analytics-btn')
        //    .addEventListener('click', this.startAnalytics);

        //setTimeout(this.startAnalytics, 3000);  // optional third argument is an array of arguments

        const timerId = setTimeout(this.startAnalytics, 3000);

        document.getElementById('stop-analytics-btn').addEventListener('click', () => {
            clearTimeout(timerId);
        });
    }

    static startAnalytics() {
        const analyticsScript = document.createElement('script');
        analyticsScript.src = 'assets/scripts/analytics.js';
        analyticsScript.defer = true;
        document.head.append(analyticsScript);
    }
}

App.init();