/*
Spoiler plugin for TinyMCE 4/5 editor

It adds special markup that in combination with a site-side JS script
can create spoiler effect (hidden text that is shown on clik) on a web-page.
An example of a site-side script: https://jsfiddle.net/romanvm/7w9shc27/

(c) 2016, Roman Miroshnychenko <romanvm@yandex.ua>
License: LGPL <http://www.gnu.org/licenses/lgpl-3.0.en.html>
*/
tinymce.PluginManager.add('spoiler', function(editor, url)
{
  var $ = editor.$;
  editor.contentCSS.push(url + '/css/spoiler.css');
  var spoilerCaption = editor.getParam('spoiler_caption', 'Spoiler!');

  if (tinymce.majorVersion == 5)
  {
    editor.ui.registry.addIcon('addspoiler', '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">  <image id="image0" width="32" height="32" x="0" y="0" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfjAhgNEjd7+KkTAAABS0lEQVRIx82UzZmDIBBA32ELoARKSAdaQu57WDqIHcQS7EC2Au0gdKAdxBLsgD0IBgzqt3rYHU4D8+aHGYBjUmEpD7KAxmKxZ/HqHK7/C/6RNJRk5EguCGCkZ8CQ8wXAN2orypXGxUmvzeRzHpvwDl7uwB7X3N9hEcUeKZAIiiRusTSIGO+ckcFgKRJZTfgnxuld6KJ1myUwYIMjvYj+DJw23sgnOjXHBg50InkA5faLqefxZM8HSdw/oMppEldTPyfdY7HcqJO4Wdg9vINupZkxHv4BvXfoS6jnMR5X8RG5uB0ZXuLNHZoV/NVetdBno3r16sIxrhY6IFxFludq8soV6Ce2X85i+xbrQovB0KIQgOQeWET4JEOEKzJnJMi4R4+8JCHrtcfLkB/HW66wj4NAoTGuqBGDRs0zsIv/UqpzOGfx6fFUx/G/lx/SoGx/xgJ8rAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0wMi0yNFQxMzoxODo1NSswMzowMFpaWx8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDItMjRUMTM6MTg6NTUrMDM6MDArB+OjAAAAAElFTkSuQmCC" /></svg>');
    editor.ui.registry.addIcon('removespoiler', '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">  <image id="image0" width="32" height="32" x="0" y="0" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfjAhgNEw495hBaAAABT0lEQVRIx+2UzXGDMBCFPzK+RyWoBDqAElwCHdgdQAehBDowHVgdhA5wByEVKActAgnhDDOZSQ55Omi07D69/UEZR2Flz9z2cpggwu8TZIdz/2kFp6RVU1CiyVEHdQJnbthoadjY5hWg5J50uga1SAQ61Lu3jN8TqODuiSsaTZPQkCRQvIvZYAL3q9g/yJ8RzGVrgBErtXf9WHRd9uo+31L5G9IEltGT5FwYndLZpV1JbDxBsymoQ7s02BVv8CFG5Gp0oi/G+w1YLPeTTJldERRA6xWFWAhcRLZNQTPtzsPkq7NKIS7ict6fyCqejl4MtZy7ZHgnX9+iM6CkJJa7E0UVJTKJPu0ndlg1G1BehaVGA4qKHoOhp0JB0JUuDN/2/EZNIU6Kgjr4yRt2UMoUPFuGkqc4r5KJV885dk8/VppSnrRX4JOBBwbDg3/8SXwBmnQv6RKa220AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDItMjRUMTM6MTk6MTQrMDM6MDCXpTVvAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTAyLTI0VDEzOjE5OjE0KzAzOjAw5viN0wAAAABJRU5ErkJggg==" /></svg>');
  }

  function addSpoiler()
  {
    var selection = editor.selection;
    var node = selection.getNode();
    if (node) {
      editor.undoManager.transact(function() {
      var content = selection.getContent();
      if (!content) {
        content = 'Spoiler text.';
      }
      selection.setContent('<div class="spoiler">' +
                           '<div class="spoiler-toggle">' + spoilerCaption + ' </div>' +
                           '<div class="spoiler-text">' + content + '</div></div>');
      });
      editor.nodeChanged();
    }
  }

  function removeSpoiler()
  {
    var selection = editor.selection;
    var node = selection.getNode();
    if (node && node.className == 'spoiler')
    {
      editor.undoManager.transact(function()
      {
        var newPara = document.createElement('p');
        newPara.innerHTML = node.getElementsByClassName('spoiler-text')[0].innerHTML;
        node.parentNode.replaceChild(newPara, node);
      });
      editor.nodeChanged();
    }
  }

  editor.on('PreProcess', function(e) {
    $('div[class*="spoiler"]', e.node).each(function(index, elem) {
      if (elem.hasAttribute('contenteditable')) {
        elem.removeAttribute('contentEditable');
      }
    });
  });

  editor.on('SetContent', function() {
    $('div[class*="spoiler"]').each(function(index, elem) {
      if (!elem.hasAttribute('contenteditable')) {
        var $elem = $(elem);
        if ($elem.hasClass('spoiler')) {
          elem.contentEditable = false;
        }
        else if ($elem.hasClass('spoiler-text')) {
          elem.contentEditable = true;
        }
      }
    });
  });

  if (tinymce.majorVersion == 4)
  {
    editor.addButton('spoiler-add',
    {
      tooltip: 'Add spoiler',
      image: url + '/img/eye-blocked.png',
      onclick: addSpoiler
    });
   editor.addMenuItem('spoiler-add',
    {
      text: 'Add spoiler',
      context: 'format',
      onclick: addSpoiler
    });
    editor.addButton('spoiler-remove',
    {
      tooltip: 'Remove spoiler',
      image: url + '/img/eye-plus.png',
      onclick: removeSpoiler
    });
    editor.addMenuItem('spoiler-remove',
    {
      text: 'Remove spoiler',
      context: 'format',
      onclick: removeSpoiler
    });
  }
  else
  {
    editor.ui.registry.addButton('spoiler-add',
    {
      tooltip: 'Add spoiler',
      icon: 'addspoiler',
      onAction: addSpoiler
    });
   editor.ui.registry.addMenuItem('spoiler-add',
    {
      text: 'Add spoiler',
      context: 'format',
      onAction: addSpoiler
    });
    editor.ui.registry.addButton('spoiler-remove',
    {
      tooltip: 'Remove spoiler',
      icon: 'removespoiler',
      onAction: removeSpoiler
    });
    editor.ui.registry.addMenuItem('spoiler-remove',
    {
      text: 'Remove spoiler',
      context: 'format',
      onAction: removeSpoiler
    });
  }
});
