<?php
/**
 * @file
 * Provide a replacement for the primary tabs/local tasks displayed
 * when creating/editing a node.
 *
 * Available variables:
 * - $node_options
 *    An array of icons (fontawesome) serving as links to various node related
 *    functions such as edit, history, etc.
 *
 * @see template_preprocess_contentnav().
 */
?>

<div class="page_admin fa-lg" style="text-align:right;">

  <?php
  foreach($node_options as $icon):
    print $icon;
  endforeach;
  ?>

</div><!-- END div.page_admin -->
