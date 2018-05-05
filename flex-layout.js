function getDOMPath(element) {
    var stack = [];
    while(element.parentNode != null) {
        console.log(element.nodeName);
        var siblingCount = 0;
        var siblingIndex = 0;
        for(var i = 0; i < element.parentNode.childNodes.length; i++ ) {
            var sibling = element.parentNode.childNodes[i];
            if(sibling.nodeName == element.nodeName) {
                if(sibling === element) {
                    siblingIndex = siblingCount;
                }
                siblingCount++;
            }
        }
        if(element.hasAttribute('id') && element.id != '') {
            stack.unshift(element.nodeName.toLowerCase() + '#' + element.id);
        }
        else if(siblingCount > 1) {
            stack.unshift(element.nodeName.toLowerCase() + ':eq(' + siblingIndex + ')');
        }
        else {
            stack.unshift(element.nodeName.toLowerCase());
        }
        element = element.parentNode;
    }
    return stack.slice(1); // removes the html element
}

function UIBackground() {

}

function UIContainerOverlay() {

}

function UIElementOverlay(target) {

}

function UIElement(target, parent) {
    var target = target;
    var embedded = [];

    this.parent = parent;
    this.properties = {};
    this.valid = false;

    this.background = null;
    this.overlay = null;

    this.enumerate = function() {
        var current = this;
        $(target).children('.flex-row, .flex-column').each(function() {
            var container = new UIContainer(this, current.parent, current.parent.workspace);
            embedded.push(container);
        });
    }

    this.bind = function() {
        var current = this;

        $(target).bind('mouseenter', { controller: this }, function(event) {
            event.data.controller.setOverlay();
            event.stopPropagation();
        });

        $(target).bind('mouseleave', { controller: this }, function(event) {
            //event.data.controller.removeOverlay();
            event.stopPropagation();
        });

        $(target).bind('click', { controller: current }, function(event) {
            //var p = event.data.controller.parent;
            //alert(JSON.stringify(getDOMPath(event.target)));

            //$('div.flex-overlay').css('visibility', 'visible');

            event.stopPropagation();
        });
    }

    this.configure = function(properties) {
        if(this.valid) {

        }
    }

    this.check = function(properties) {
        return properties;
    }

    this.setOverlay = function() {
        $('div.ui-container-overlay').css(this.parent.size());
        $('div.ui-container-overlay').css(this.parent.position());
        $('div.ui-container-overlay').children('div.ui-element-overlay').css(this.size());
        $('div.ui-container-overlay').children('div.ui-element-overlay').css(this.position());

        $('div.ui-container-overlay').css('visibility', 'visible');
        $('div.ui-container-overlay').children('div.ui-element-overlay').css('visibility', 'visible');

        var parentInstance = $('div.ui-container-overlay');
        $(parentInstance).children('div.ui-element-overlay').bind('mouseleave', function(event) {
            $(parentInstance).css('visibility', 'hidden');
            $(parentInstance).children('div.ui-element-overlay').css('visibility', 'hidden');
            event.stopPropagation();
        });
    }

    this.position = function() {
        var parentPosition = this.parent.position();
        var position = $(target).position();
        return { top: position.top - parentPosition.top, left: position.left - parentPosition.left };
    }

    this.size = function() {
        var width = $(target).width();
        var height = $(target).height();
        return { width: width, height: height };
    }

    this.initiate = function() {
        this.enumerate();
        this.bind();
    }

    this.initiate();

}

function UIContainer(target, parent, workspace) {
	var target = target;
    var elements = [];

	this.parent = parent;
	this.workspace = workspace;
	this.properties = {};
    this.valid = false;

    this.background = null;
    this.overlay = null;

    this.enumerate = function() {
        var current = this;
        $(target).children('.flex-row-cell, .flex-row-cell-stretched, ' +
            '.flex-column-cell, .flex-column-cell-stretched').each(function() {

            var element = new UIElement(this, current);
            elements.push(element);
        });
    }

	this.bind = function() {
	    $(target).bind('mouseenter', { controller: this }, function(event) {
            event.data.controller.setOverlay();
        });

        $(target).bind('mouseleave', { controller: this }, function(event) {
            event.data.controller.removeOverlay();
        });
    }

    this.configure = function(properties) {
		if(this.valid) {

		}
	}

    this.check = function(properties) {
        return properties;
    }

	this.addElement = function(prependSibling) {
		if(prependSibling) {

		}
		else {

		}
	}

    this.setOverlay = function() {
        //$('div.flex-overlay').css('visibility', 'visible');
    }

    this.removeOverlay = function() {
        //$('div.flex-overlay').css('visibility', 'hidden');
    }

    this.position = function() {
        return $(target).position();
    }

    this.size = function() {
        var width = $(target).width();
        var height = $(target).height();
        return { width: width, height: height };
    }

    this.initiate = function() {
	    this.enumerate();
	    this.bind();
    }

    this.initiate();
}

function UIWorkspace() {
    //this.overlay = new UIOverlay();
    this.properties = { test:'test' };

    this.enumerate = function() {
        var workspace = this;
        $('section.page-content').children('.flex-row, .flex-column').each(function() {
            new UIContainer(this, null, workspace);
        });
    }

    this.bind = function() {

    }

    this.initiate = function() {
        this.enumerate();
        this.bind();
    }

    this.initiate();
}

$(document).ready(function() {
	var workspace = new UIWorkspace();
});
