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

  $form['contentpalette_display'] = array(
    '#type' => 'checkbox',
    '#title' => t('Display the content palette'),
    '#default_value' => variable_get('contentpalette_display', 1),
    '#tree' => FALSE,
    '#description' => t('Check here to display the content palette'),
  );

  return system_settings_form($form);
}
