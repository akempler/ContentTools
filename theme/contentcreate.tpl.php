<?php
/**
 * @file
 * Displays a + icon which provides a dropdown list of content types to create.
 *
 * Available variables:
 * - $add_options
 *    The links to create content that will appear under the + glyphicon
 *    allowing creation of various node types.
 *
 * @see template_preprocess_contentcreate_icon().
 */
?>

<div class="page_admin fa-lg" style="text-align:right;">

  <a href="#" title="Add Content"><span id="addcontent" class="fa fa-plus" data-content="<?php print $add_options;?>"></span></a>

</div><!-- END div.page_admin -->
