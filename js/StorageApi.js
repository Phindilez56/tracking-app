class StorageApi {
    constructor() { };

    saveData = (key, params) => {
        const list = [];
        const existingData = this.getData(key);
        const data = (existingData == null) ? {} : JSON.parse(existingData);

        if (Array.isArray(data)) {
            list.push(...data);
        }

        list.push(params);

        localStorage.setItem(key, JSON.stringify(list));
        localStorage.setItem("currentUser", JSON.stringify(params));
    }

    storeIssue = (issue) => {
        const list = this.getIssuesList("issues");

        if (list !== null) {
            const newList = JSON.parse(list);

            newList.push(issue);
            localStorage.setItem("issues", JSON.stringify(newList))
        } else {
            localStorage.setItem("issues", JSON.stringify(issue));
        }
    }

    getIssuesList = () => {
        return localStorage.getItem("issues");
    }

    setCurrentUser = (user) => {
        localStorage.setItem("currentUser", JSON.stringify(user));
    }

    getData = (key) => {
        return localStorage.getItem(key);
    }

    removeData = (key) => {
        return localStorage.removeItem(key);
    }

}