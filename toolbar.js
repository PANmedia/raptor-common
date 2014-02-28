function toolbarLayout(pluggable, uiOrder, panelElement, pluginAttributes) {
    panelElement = $(panelElement || document.createElement('div'));
    // Loop the UI component order option
    for (var i = 0, l = uiOrder.length; i < l; i++) {
        var uiGroupContainer = $('<div/>')
            .addClass('raptor-layout-toolbar-group');

        // Loop each UI in the group
        var uiGroup = uiOrder[i];
        for (var ii = 0, ll = uiGroup.length; ii < ll; ii++) {
            // <strict>
            // Check the UI has been registered
            if (!pluggable.plugins[uiGroup[ii]]) {
                handleError('Plugin identified by key "' + uiGroup[ii] + '" does not exist');
                continue;
            }

            // </strict>
            var pluginOptions = pluggable.plugins[uiGroup[ii]];
            if (pluginOptions === false) {
                continue;
            }

            var component = pluginPrepare(pluggable, pluggable.plugins[uiGroup[ii]], pluginOptions, pluginAttributes);

            pluggable.pluginInstances[uiGroup[ii]] = component.instance;

            if (typeIsElement(component.ui)) {
                // Fix corner classes
                component.ui.removeClass('ui-corner-all');

                // Append the UI object to the group
                uiGroupContainer.append(component.ui);
            }
        }

        // Append the UI group to the editor toolbar
        if (uiGroupContainer.children().length > 0) {
            uiGroupContainer.appendTo(panelElement);
        }
    }

    // Fix corner classes
    panelElement.find('.ui-button:first-child').addClass('ui-corner-left');
    panelElement.find('.ui-button:last-child').addClass('ui-corner-right');
    return panelElement[0];
};
