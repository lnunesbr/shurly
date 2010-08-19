// $Id$
Drupal.behaviors.shurly = function() {
  if ($('#edit-result').length) {
    var clip = new ZeroClipboard.Client();
    clip.setText($('#edit-result').val());
    clip.setHandCursor( true );
    clip.glue('shurly-copy', 'shurly-copy-container');
    clip.addEventListener( 'onComplete', function() {
      $('#edit-result').css('backgroundColor', '#FFFF3F').fadeTo(300, .1, function(){
        $(this).fadeTo(1, 1).css('backgroundColor', '#FFF');
      });
    });
    
    $('#edit-result')
      .focus()
      .focus(function(e){
        $(this).select();
      })
      .mouseup(function(){
        // fix for select problem in WebKit
        return false;
      });
  }
}