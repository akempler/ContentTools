/**
 * @file
 * JavaScript to place the content palette on the screen 
 * and synchronize settings between the palette and the node form.
 */


jQuery(document).ready(function() {

  /**
   * Set the top of the content palette to the top of the region it is being displayed in.
   */
  if ((typeof Drupal.settings.contenttools.contenttoolsactive != 'undefined') && (Drupal.settings.contenttools.contenttoolsactive)) {
    var region = Drupal.settings.contenttools.contentpalette_region;
    var palette = jQuery(region);
    var paletteOffset = jQuery(region).offset().top;
    // The animation was too jerky. Was sliding in from the top but not smoothly.
    //jQuery('#content-palette-form').animate({
    //  top: paletteOffset + 20,
    //}, 1000);
    jQuery('#content-palette-form').css({"top": paletteOffset + 20});
  }

  if (typeof CKEDITOR !== 'undefined') {

    CKEDITOR.on('instanceReady', function(e) {
      var editor = e.editor;

      var viewportHeight = jQuery(window).height();
      editor.resize('100%', viewportHeight - 80);
    });
  }
  
  if (jQuery("#edit-title").length) {
    jQuery('html, body').animate({
      //scrollTop: $(".node-form .form-textarea-wrapper").offset().top
      scrollTop: jQuery("#edit-title").offset().top
    }, 1000);
  }
  
});


(function ($) {
  Drupal.behaviors.contenttools_global = {
    attach: function (context) {

      // Hide the default tabs/local tasks normall displayed for example on a node page. (a triangle to expand them is provided).
      $(".admin_tabs_toggle").bind("click", function() {
        $('.nav-tabs').slideToggle(400);
      });

      // The following adjustments are for when creating/editing a node, which is when the content tools palette is active.s
      if ((typeof Drupal.settings.contenttools.contenttoolsactive != 'undefined') && (Drupal.settings.contenttools.contenttoolsactive)) {

        // TODO handle this field not existing.
        // Collapse the filter options under textareas.
        $('fieldset.filter-wrapper').prepend('<img id="filterexpand" src="/sites/all/modules/contenttools/images/arrow-asc.png" /> Text Formats:')
        $('fieldset.filter-wrapper div.panel-body').toggle();
        $("fieldset.filter-wrapper").bind("click", function() {
          $('fieldset.filter-wrapper div.panel-body').slideToggle(400);
        });

        // Mirror the settings in the vertical tabs for the node with the content palette.
        $("#edit-published").prop("checked", $("#edit-status").checked);
        $("#edit-promoted").prop("checked", $("#edit-promote").checked);
        $("#edit-tags").val($("#edit-field-tags-und").val());

        // Sync changes in palette back to node form fields.
        $("#edit-published").change(function() {
          $("#edit-status").prop("checked", this.checked);
        });
        $("#edit-promoted").change(function() {
          $("#edit-promote").prop("checked", this.checked);
        });

        $("#edit-tags").change(function() {
          $("#edit-field-tags-und").val($(this).val());
        });
      }
    }
  };

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
          //var position = addlink.position();
          top = position.top + addlink.outerHeight(true);
          left = position.left;
          $modal.css({
              top:top + $(window).scrollTop(),
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

