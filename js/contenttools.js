/**
 * @file
 * JavaScript to place the content palette on the screen 
 * and synchronize settings between the palette and the node form.
 */


jQuery(document).ready(function() {

  // Adjust the height of the ckeditor window.
  if (typeof CKEDITOR !== 'undefined') {

    CKEDITOR.on('instanceReady', function(e) {
      var editor = e.editor;

      var viewportHeight = jQuery(window).height();
      editor.resize('100%', viewportHeight - 80);
    });
  }

  // If the title field already has text in it scroll to the body field.
  if ((jQuery("#edit-title").length > 0) && (jQuery("#edit-title").val().length > 0)) {
    jQuery('html, body').animate({
      scrollTop: jQuery("#edit-body").offset().top - 80
    }, 1000);
  }

});


(function ($) {
  Drupal.behaviors.contenttools_global = {
    attach: function (context) {

      // Handle conflict between jquery ui and bootstrap tooltips.
      // If bootstrap tooltip is installed 
      // return $.fn.tooltip to previously assigned value
      if ($.isFunction($.fn.tooltip) && $.isFunction($.fn.tooltip.noConflict)) {
        var bootstrapTooltip = $.fn.tooltip.noConflict();

        // give $().bootstrapTooltip the Bootstrap functionality
        $.fn.bootstrapTooltip = bootstrapTooltip

        // now activate tooltip plugin from jQuery ui
        //$(document).tooltip();
        // activating it below with additional details.
      }

      if ($('.contenttools-tooltip').length > 0) {
        $('.contenttools-tooltip').tooltip({

          content: function () {
            return $(this).attr('data-content');
          },
          items: "span[data-content]",
          show: "fold",
          close: function(event, ui)
          {
            ui.tooltip.hover(function()
            {
              $(this).stop(true).fadeTo(500, 1);
            },
            function()
            {
              $(this).fadeOut('500', function()
                  {
                    $(this).remove();
                  });
              });
           }
        });
      }

      // Hide the default tabs/local tasks normall displayed for example on a node page. (a triangle to expand them is provided).
      $(".admin_tabs_toggle").bind("click", function() {
        $('.nav-tabs').slideToggle(400);
      });

      // The following adjustments are for when creating/editing a node, which is when the content tools palette is active.s
      if ((typeof Drupal.settings.contenttools.contenttoolsactive != 'undefined') && (Drupal.settings.contenttools.contenttoolsactive)) {

        if ($('#filterexpand').length == 0) {
          $('fieldset.filter-wrapper').prepend('<img id="filterexpand" src="' + Drupal.settings.basePath + Drupal.settings.contenttools.modulepath + '/images/arrow-asc.png" /> Text Formats:')
          $('fieldset.filter-wrapper').find("div").eq(0).toggle();
          $("#filterexpand").bind("click", function() {
            //$('fieldset.filter-wrapper div.panel-body').slideToggle(400);
            $('fieldset.filter-wrapper').find("div").eq(0).slideToggle(400);
          });
        }

        // Mirror the settings in the vertical tabs for the node with the content palette.
        $("#edit-published").prop("checked", $("#edit-status").checked);
        $("#edit-promoted").prop("checked", $("#edit-promote").checked);
        // If tags are enabled.
        if ($("#edit-tags").length > 0) {
          $("#edit-tags").val($("#edit-field-tags-und").val());
        }

        // Sync changes in palette back to node form fields.
        $("#edit-published").change(function() {
          $("#edit-status").prop("checked", this.checked);
        });
        $("#edit-promoted").change(function() {
          $("#edit-promote").prop("checked", this.checked);
        });

        if ($("#edit-tags").length > 0) {
          $("#edit-tags").change(function() {
            $("#edit-field-tags-und").val($(this).val());
          });
        }
      }
    }
  };

  // Content Palette 
  Drupal.behaviors.contenttools_global2 = {
    attach: function (context) {
      var formid = $('.node-form').attr('id');
      // When we submit the content tools palette also submit the node form.
      // This is necessary because we aren't actually saving the data in the
      // content palette, we're just mirroring the data back to the node form.
      $("#edit-save2").bind("click", function() {
        $('#' + formid).trigger('submit');
      });
      

      var modal = (function(){
        var
        method = {},
        $modal,
        $content,
        $close;
        
        // Append the HTML
        $modal = $('<div id="contenttoolsmodal"></div>');
        $content = $('<div id="modalcontent"></div>');
        $close = $('<a id="modalclose" href="#">close</a>');

        $modal.hide();
        $modal.append($content, $close);

        // Position the modal in the viewport
        method.position = function () {
          var top, left;

          var addlink = $("#addcontent");
          var position = addlink.offset();
          top = position.top + addlink.outerHeight(true);
          left = position.left;
          $modal.css({
              top:top,
              left:left + $(window).scrollLeft()
          });
        };

        // Open the modal
        method.open = function (settings) {
          $content.empty().append(settings.content);
          //$content.empty().text(settings.content);

          $modal.css({
              width: settings.width || 'auto',
              height: settings.height || 'auto'
          })

          method.position();

          $(window).bind('resize.modal', method.center);

          $modal.show();
        };

        // Close the modal
        method.close = function () {
          $modal.hide();
          $content.empty();
          $(window).unbind('resize.modal');
        };

        $('body').append($modal);
        
        return method;
      }());
      
      $('#addcontent').click(function(e){
        var el = $(this);
        var out = el.attr('data-content');
        modal.open({content: out});
        e.preventDefault();
      });
      
      $('#contenttoolsmodal').mouseleave(function(){
        modal.close();
      });
      $('#modalclose').click(function(e){
        modal.close();
        e.preventDefault();
      });
      
    }
  };


})(jQuery);
