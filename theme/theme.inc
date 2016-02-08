<?php
/**
 * @file
 * Theme preprocessors for the node palette and contentnav items.
 *
 * To add or modify the contentnav items, override the
 * template_preprocess_contentnav() function in your own module.
 */

/**
 * Theme preprocessor for the contentnav.tpl.php.
 */
function template_preprocess_contentnav(&$vars) {

  $node_options = array();

  // Used for populating a modal.
  if ($vars['node']) {

    $account = user_load($vars['node']->uid);
    $submitted = t('By !username on !datetime', array(
      '!username' => theme('username',
      array(
        'account' => $account)),
        '!datetime' => format_date($vars['node']->created, 'custom', 'm/d/y'),
        ));
    $node_info = "<span class='submitted'>" . htmlentities($submitted) . '</span>';

    // TODO loop through different node types specified as book pages.
    if (isset($vars['node']->book)) {
      $node_options['book_page'] = l(t(''),
        'node/add/book', array(
          'query' => array('parent' => $vars['node']->book['mlid']),
          'attributes' => array(
            'title' => 'Add Child Page',
            'class' => array('fa', 'fa-plus-square', 'contentnavicon'),
          ),
        ));
    }

    if (node_access("update", $vars['node']->nid) === TRUE) {
      $node_options['edit'] = l(t(''),
        'node/' . $vars['node']->nid . '/edit',
          array(
            'attributes' => array(
              'title' => 'Edit',
              'class' => array('fa', 'fa-edit', 'contentnavicon'),
            )));
    }

    if (isset($vars['node']->book)) {
      $node_options['print'] = l(t(''),
        'book/export/html/' . $vars['node']->nid,
        array(
          'attributes' => array(
            'title' => 'Printer friendly',
            'class' => array('fa fa-print', 'contentnavicon'))));
    }

    // TODO should probably check for permission to access revisions.
    // Though if they don't have permission they will be stopped at
    // the next screen.
    if (db_query('SELECT COUNT(vid) FROM {node_revision} WHERE nid = :nid' , array (':nid' => $vars['node']->nid))->fetchField() > 1) {
      $node_options['revisions'] = l(t(''),
        'node/' . $vars['node']->nid . '/revisions',
        array(
          'attributes' => array(
            'title' => 'Revisions',
            'class' => array('fa fa-history', 'contentnavicon'))));
    }

    $node_options['info'] = '<a href="#" title="Page info"><span class="fa fa-info-circle" data-container="body" data-toggle="popover" data-html="true" data-placement="bottom" data-content="' . $node_info . '"></span></a>';


  } // END if($vars['node'])

  $vars['node_options'] = $node_options;

}


/**
 * Theme preprocessor for the contentcreate.tpl.php.
 */
function template_preprocess_contentcreate_icon(&$vars) {

  $create = array();
  $node_options = array();
  $add_options = array();

  //$types = node_type_get_types();
  $item = menu_get_item('node/add');

  $content = system_admin_menu_block($item);
  if ($content) {
    foreach ($content as $type) {
      if ($type['access']) {
        $create[$type['mlid']] = '<p>' . l($type['title' ], $type[ 'href'], $type['localized_options' ]) . '</p>';
      }
    }
  }

  // TODO Use book module to get the book types.
  if (isset($vars['node']) && isset($vars['node']->book)) {
    $create['book_page'] = '<p>' . l(t('Child Book Page'),
      'node/add/book', array(
        'query' => array('parent' => $vars['node']->book['mlid']),
        'attributes' => array('title' => 'Add Page'),
      )) . '</p>';
  }

  $add_options = implode('', $create);
  $vars['add_options'] = htmlentities($add_options);
}
