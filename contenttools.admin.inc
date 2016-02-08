<?php
/**
 * @file
 * Provide a settings form for the contenttools module.
 */

/**
 * Provide a settings form for the module.
 */
function contenttools_settings_form() {
  $form = array();

  $form['contentpalette_fontawesome_cdn'] = array(
    '#type' => 'checkbox',
    '#title' => t('Use the Font Awesome CDN'),
    '#default_value' => variable_get('contentpalette_fontawesome_cdn', 1),
    '#tree' => FALSE,
    '#description' => t('Check here to use the Font Awesome CDN. Alternatively you can download it locally. See the readme.txt'),
  );

  $admin_theme = variable_get('admin_theme', 'none');
  //$default_theme = variable_get('theme_default', 'none');
  if ($admin_theme != 'none') {

    $form['contentpalette_display'] = array(
      '#type' => 'checkbox',
      '#title' => t('Display the content palette'),
      '#default_value' => variable_get('contentpalette_display', 1),
      '#tree' => FALSE,
      '#description' => t('Check here to display the content palette'),
    );

    $regions = system_region_list($admin_theme);
    array_unshift($regions, "-- Select a Region --");

    /*
    */
    $form['contentpalette_region'] = array(
      '#type' => 'select',
      '#title' => t('Palette Region'),
      '#options' => $regions,
      '#default_value' => variable_get('contentpalette_region', ''),
      '#description' => t('Select a region to display the content palette in. Usually a sidebar is appropriate.'),
    );

    $form['contentpalette_remove_blocks'] = array(
      '#type' => 'checkbox',
      '#title' => t('Remove blocks'),
      '#default_value' => variable_get('contentpalette_remove_blocks', 1),
      '#tree' => FALSE,
      '#description' => t('Check here to remove other blocks from the content palette region when creating/editing a node.'),
    );
  }

  return system_settings_form($form);
}
