<?php
/**
 * @file
 * Display a floating block of node form fields.
 * These are duplicates of some of the standard node form fields just in a
 * more convenient location.
 * For example, the Publish, Promoted to front page, and Add Tags fields.
 */

$form = drupal_get_form('content_palette_form');
$out = drupal_render($form);

print $out;
