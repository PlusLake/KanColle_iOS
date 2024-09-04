(() => {
    const originalConsole = console;
    const debug = document.createElement("div");
    debug.id = "debug";
    debug.style.position = "fixed";
    debug.style.width = "100%";
    debug.style.height = "300px";
    debug.style.left = "0px";
    debug.style.bottom = "0px";
    debug.style.fontFamily = "monospace";
    debug.style.backgroundColor = "rgba(255, 255, 255, .75)";
    debug.style.zIndex = "65536";

    const textArea = document.createElement("textArea");
    textArea.style.position = "absolute";
    textArea.style.width = "800px";
    textArea.style.height = "150px";
    textArea.style.top = "0px";
    textArea.style.left = "200px";

    const fetchButton = document.createElement("div");
    fetchButton.style.width = "200px";
    fetchButton.style.height = "150px";
    fetchButton.style.backgroundColor = "rgba(192, 192, 192)";
    fetchButton.addEventListener("click", (event) => {
        fetch("https://kancolle-ios-debugger-864548865947.asia-northeast1.run.app")
            .then(response => response.text())
            .then(text => textArea.value = text);
    });

    const executeButton = document.createElement("div");
    executeButton.style.position = "absolute";
    executeButton.style.bottom = "0px";
    executeButton.style.width = "200px";
    executeButton.style.height = "150px";
    executeButton.style.backgroundColor = "rgba(255, 192, 192)";
    executeButton.addEventListener("click", (event) => {
        try {
            eval(textArea.value);
        } catch (e) {
            console.log(e);
        }        
    });

    const debugOutput = document.createElement("div");
    debugOutput.style.position = "absolute";
    debugOutput.style.bottom = "0px";
    debugOutput.style.width = "800px";
    debugOutput.style.height = "150px";
    debugOutput.style.left = "200px";
    debugOutput.style.overflowY = "scroll";
    debugOutput.style.backgroundColor = "rgba(192, 255, 192)";
    debugOutput.style.textAlign = "left";

    const minimize = document.createElement("div");
    minimize.style.position = "fixed";
    minimize.style.left = "300px";
    minimize.style.top = "0px";
    minimize.style.width = "50px";
    minimize.style.height = "15px";
    minimize.style.backgroundColor = "rgba(192, 192, 192)";
    minimize.innerText = "debug"
    minimize.addEventListener("click", () => {
        if (debug.style.display != "none") {
            debug.style.display = "none";
        } else {
            debug.style.display = "block";
        }
    });

    document.body.appendChild(debug);
    debug.appendChild(fetchButton);
    debug.appendChild(executeButton);
    debug.appendChild(textArea);
    debug.appendChild(debugOutput);
    document.body.appendChild(minimize);

    console = {};
    console.log = (log) => {
        debugOutput.innerHTML += log + "<br>";
        originalConsole.log(log);
    };


})();
