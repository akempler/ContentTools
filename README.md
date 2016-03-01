# ContentTools

This module provides some simple UI tweaks to the Drupal admin and node screens.

One problem with Drupal's backend is that it looks and feels like it was built by developers.
Whenever I put it in front of non technical users (for example, a newsroom),
the content creation process can be intimidating and cumbersome.

Normally I create a custom backend solution for customers, however this can be costly.
For smaller customers I often just want to simplify the content creation process and make the experience quicker and more intuitive.

This module contains some of the tweaks I use.
Normally these tweaks were fairly specific to the customer's theme and other site specific requirements but I've tried to abstract some of that out and make it more generic.  


**So what does it do? It adds three new components:**

### Create Content:
This block adds a + icon providing quick access to create content. Just add it to a region via the block admin. Clicking on it reveals a dropdown of content the user can create. These are the same content types that would appear for the user if they went to /node/add. In other words, only types they have permission to create will be listed there.

### Node Tools:
I find the primary tabs awkward. Especially because with other modules installed they can have options I don't want certain customers to see. I could just hide some of them or fidget with permissions but certain users will still need to access them. Also I find them visually distracting. This component creates a simplified menu of just the menu items everyone needs access to such as node info, edit, and revisions. These are presented as small icons at the top of the node. Additionally, if the book module is installed and the current node is a book page it will provide the ability to create a child page.

The original primary tabs are still accessible via a small triangle button which toggles their visibility.

### Node Palette:
The node palette displays some of the most commonly used node form fields in a floating palette. For example, the Publish checkbox, Promoted to Front Page, Tags field, and the Save button. This block is enabled by default on the Content Tools Configuration page.

![okayNav Demo](https://raw.githubusercontent.com/akempler/doctools/master/screens.gif)

![okayNav Demo](https://raw.githubusercontent.com/akempler/ContentTools/master/screens.gif)

### Other Tweaks:
By default drupal displays options for selecting different text formats when creating content. I find this just tends to confuse users that have pemission to create multiple formats. The module collapses the Text Formats fieldset by default. This behavior can be controlled on the module's configuration page.

If the user is editing a node, automatically scroll to the top of the body field. This simplifies the content creation/editing process which is the goal with all of these tweaks.


**Some caveats:**
Since I developed this as a solution for my customers it is somewhat dependent on my toolset. Currently I've been using Twitter Bootstrap as a base theme, for both the front and backend. As such, you may need to tweak the css to get things to look correct based on what theme you are using.
Also, for the node palette it only checks if you are using the default tags field. If you've made a custom field for these it won't know about it.

The node palette form isn't really able to be overridden at this point because of the way the module is setup. The fields are just duplicates of the existing fields located in the bottom vertical tabs. In fact anything you enter into the floating palette fields is mirrored to the actual fields below. This results in something that is somewhat rigid but was easy and quick to implement and still met my needs.

Tags: Currently this only gets displayed in the palette if you've enabled the existing Drupal default tags field for your node type. If you create your own it won't recognize it (it only looks for a field name of field_tags.

### Adding links/icons to the Node Tools
Override template_preprocess_contentnav(&$vars) located in the theme.inc file. This will give you access to an array of $vars['node_options'].
For example:
```
function booktools_preprocess_contentnav(&$vars) {
  var_dump($vars['node_options']);
}
```


## Installation and Requirements:

Requires the jQuery Update module. (jquery 1.9 or greater).

1. Enable the ContentTools module.

2. Configure the module at:
/admin/config/user-interface/contenttools

3. Add the Create Content block (optionally) on the block admin page
This will add a + icon with a dropdown letting users create content.
Generally this would be added to the top of a sidebar.

4. This module uses Font Awesome for icons.
You have two easy options for usage:
1: After enabling the module, go to the settings page for the module and check the "use Font Awesome CDN".
2: Download font awesome from http://fortawesome.github.io/Font-Awesome/ and extract the contents into contenttools/fontawesome.

### Known Issues:

If you are using the Twitter Bootstrap module, there is a known conflict between the bootsrap tooltip function and the jquery ui tooltip function. Use the jquery ui tooltip instead. If that is not an option let me know in the github issues and I'll create a workaround.
