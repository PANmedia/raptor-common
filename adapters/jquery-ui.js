/**
 * @fileOverview jQuery UI helper functions.
 * @license http://www.raptor-editor.com/license
 *
 * @author David Neilsen david@panmedia.co.nz
 * @author Michael Robinson michael@panmedia.co.nz
 */

/**
 * Wrap the jQuery UI button function.
 *
 * @param {Element|Node|selector} element
 * @param {Object|null} options The options relating to the creation of the button.
 * @returns {Element} The modified element.
 */
function aButton(element, options) {
    // <strict>
    if (!typeIsJQueryCompatible(element)) {
        handleInvalidArgumentError('Parameter 1 to aButton is expected to be a jQuery compatible object', element);
    }
    // </strict>

    return $(element).button(options);
}

/**
 * Wrap the jQuery UI button's set label function.
 *
 * @param {Element|Node|selector} element
 * @param {String} text The text for the label.
 * @returns {Element} The labelled button.
 */
function aButtonSetLabel(element, text) {
    // <strict>
    if (!typeIsJQueryCompatible(element)) {
        handleInvalidArgumentError('Parameter 1 to aButtonSetLabel is expected to be a jQuery compatible object', element);
    }
    // </strict>

    $(element).button('option', 'text', true);
    return $(element).button('option', 'label', text);
}

/**
 * Wrap the jQuery UI button's set icon function.
 *
 * @param {Element|Node|selector} element
 * @param {String} icon The icon name to be added to the button, e.g. 'ui-icon-disk'
 * @returns {Element} The modified button.
 */
function aButtonSetIcon(element, icon) {
    // <strict>
    if (!typeIsJQueryCompatible(element)) {
        handleInvalidArgumentError('Parameter 1 to aButtonSetIcon is expected to be a jQuery compatible object', element);
    }
    // </strict>

    return $(element).button('option', 'icons', {
        primary: icon
    });
}

/**
 * Wrap the jQuery UI button's enable function.
 *
 * @param {Element|Node|selector} element
 * @returns {Element} The enabled button.
 */
function aButtonEnable(element) {
    // <strict>
    if (!typeIsJQueryCompatible(element)) {
        handleInvalidArgumentError('Parameter 1 to aButtonEnable is expected to be a jQuery compatible object', element);
    }
    // </strict>

    return $(element).button('option', 'disabled', false);
}

function aButtonIsEnabled(element) {
    return !$(element).is('.ui-state-disabled');
}

/**
 * Wrap the jQuery UI button's disable function.
 *
 * @param {Element|Node|selector} element
 * @returns {Element} The disabled button.
 */
function aButtonDisable(element) {
    // <strict>
    if (!typeIsJQueryCompatible(element)) {
        handleInvalidArgumentError('Parameter 1 to aButtonDisable is expected to be a jQuery compatible object', element);
    }
    // </strict>

    return $(element).button('option', 'disabled', true);
}

/**
 * Wrap the jQuery UI button's add class function.
 *
 * @param {Element|Node|selector} element
 * @returns {Element} The highlighted button.
 */
function aButtonActive(element) {
    // <strict>
    if (!typeIsJQueryCompatible(element)) {
        handleInvalidArgumentError('Parameter 1 to aButtonActive is expected to be a jQuery compatible object', element);
    }
    // </strict>

    return $(element).addClass('ui-state-highlight');
}

/**
 * Wrap the jQuery UI button's remove class function.
 *
 * @param {Element|Node|selector} element
 * @returns {Element} The button back in its normal state.
 */
function aButtonInactive(element) {
    // <strict>
    if (!typeIsJQueryCompatible(element)) {
        handleInvalidArgumentError('Parameter 1 to aButtonInactive is expected to be a jQuery compatible object', element);
    }
    // </strict>

    return $(element).removeClass('ui-state-highlight');
}

/**
 * Wrap the jQuery UI button's initialise menu function.
 *
 * @param {Element|Node|selector} element
 * @param {Object|null} options The set of options for menu creation.
 * @returns {Element} The menu.
 */
function aMenu(element, options) {
    // <strict>
    if (!typeIsJQueryCompatible(element)) {
        handleInvalidArgumentError('Parameter 1 to aMenu is expected to be a jQuery compatible object', element);
    }
    // </strict>

    return $(element).menu(options);
}

/**
 * Initialises a dialog with the given element.
 *
 * @param {Element|Node|selector} element
 * @param {Object|null} options The set of options for the menu.
 * @returns {Element} A dialog.
 */
function aDialog(element, options) {
    // <strict>
    if (!typeIsJQueryCompatible(element)) {
        handleInvalidArgumentError('Parameter 1 to aDialog is expected to be a jQuery compatible object', element);
    }
    // </strict>

    options.dialogClass = typeof options.dialogClass !== 'undefined' ? options.dialogClass + ' ui-dialog-fixed' : 'ui-dialog-fixed';
    var dialog = $(element).dialog(options);
    dialog.parent().css({
        top: (parseInt(dialog.parent().css('top')) || 0) - $(window).scrollTop()
    });
    dialog.dialog("option", "position", 'center');
    return dialog;
}

/**
 * Wrap the jQuery UI open dialog function.
 *
 * @param {Element|Node|selector} element
 * @returns {Element}
 */
function aDialogOpen(element) {
    // <strict>
    if (!typeIsJQueryCompatible(element)) {
        handleInvalidArgumentError('Parameter 1 to aDialogOpen is expected to be a jQuery compatible object', element);
    }
    // </strict>

    return $(element).dialog('open');
}

/**
 * Wrap the jQuery UI close dialog function.
 *
 * @param {Element|Node|selector} element
 * @returns {Element}
 */
function aDialogClose(element) {
    // <strict>
    if (!typeIsJQueryCompatible(element)) {
        handleInvalidArgumentError('Parameter 1 to aDialogClose is expected to be a jQuery compatible object', element);
    }
    // </strict>

    return $(element).dialog('close');
}

function aDialogRemove(element) {
    // <strict>
    if (!typeIsJQueryCompatible(element)) {
        handleInvalidArgumentError('Parameter 1 to aDialogClose is expected to be a jQuery compatible object', element);
    }
    // </strict>

    return $(element).dialog('destroy').remove();
}

/**
 * Wrap the jQuery UI tabs function.
 *
 * @param  {Element|Node|selector} element
 * @param  {Object|null} options
 * @returns {Element}
 */
function aTabs(element, options) {
    // <strict>
    if (!typeIsJQueryCompatible(element)) {
        handleInvalidArgumentError('Parameter 1 to aTabs is expected to be a jQuery compatible object', element);
    }
    // </strict>

    return $(element).tabs(options);
}
