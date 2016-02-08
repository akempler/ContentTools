<?php
/**
 * @file
 * The original tabs displayed when on a node page (view, edit, etc),
 * are wrapped in an expandable div which is collapsed by default.
 * The contentnav.tpl provides a replacement for them using icons.
 * The original set of tabs are still kept because other modules might add
 * their own tabs and contentnav.tpl just provides the most used items like
 * edit, view, and history.
 */

global $base_url;

$tabs = menu_primary_local_tasks();

if($tabs):
  $icon = array(
    'path' => 'misc/arrow-asc.png',
    'alt' => 'Admin tabs',
    'title' => 'Admin tabs',
    'width' => '13px',
    'height' => '13px',
    'attributes' => array(
      'class' => array(
        'admin_tabs_toggle', 'group',
      ),
      'id' => 'admin_tabs_toggle',
    ),
  );
  $img = theme('image', $icon);

  print '<div id="nodenav">';
  print $img;
  print '<div style="clear: both;"></div>';
  print '<h2 class="element-invisible">' . t('Primary tabs') . '</h2>';
  print '<ul class="tabs primary tabs--primary nav nav-tabs">';
  print drupal_render($tabs);
  print '</ul>';
  print '</div>';

endif;
