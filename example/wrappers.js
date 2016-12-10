(function ( id ) {
	var wrap       = function ( options, items ) {
		if ( options.debug && options.debug.timing ) console.time ( 'wrap-' + this.descriptor.id );
		if ( options.debug && options.debug.wrapper ) console.info ( 'items', [ items.length, items ] );
		if ( !items.length ) return false;
		
		var self     = this,
		    channels = window.wgm.proxy ( 'channels' ),
		    channel  = channels.get ( self.descriptor.channel );
		
		var handler        = function () {
			channel.emit ( 'wdgt:click' );
			channels.get ( 'common' ).emit ( 'wdgt:click' );
		};
		var obServer       = function () {
			var cnt = parseInt ( this.data ( 'cnt' ) ) || 0;
			this.data ( 'cnt', cnt + 1 );
			this.text ( this.text () + '-' + this.data ( 'cnt' ) );
		};
		var obServerCommon = function () {
			this.toggleClass ( 'bld' );
		};
		
		items.each ( function ( idx, node ) {
			var el = window.wgm.$ ( node );
			el
				.empty ()
				.append ( '<span>ID: ' + self.descriptor.id + ' ' + (idx + 1) + '</span>' )
				.on ( 'click', handler.bind ( el ) )
			;
			channel.addListener ( 'wdgt:click', obServer.bind ( el ) );
			channels.get ( 'common' ).addListener ( 'wdgt:click', obServerCommon.bind ( el ) );
		} );
		
		if ( options.debug && options.debug.timing ) console.timeEnd ( 'wrap-' + this.descriptor.id );
	};
	var wrapIFrame = function ( options, items ) {
		if ( options.debug && options.debug.timing ) console.time ( 'wrapIFrame-' + this.descriptor.id );
		if ( options.debug && options.debug.wrapper ) console.info ( 'items', [ items.length, items ] );
		if ( !items.length ) return false;
		
		var self     = this,
		    channels = window.wgm.proxy ( 'channels' ),
		    channel  = channels.get ( self.descriptor.channel );
		
		/*
		 var handler        = function () {
		 channel.emit('wdgt:click');
		 channels.get('common').emit('wdgt:click');
		 };
		 var obServer       = function () {
		 var cnt = parseInt(this.data('cnt')) || 0;
		 this.data('cnt', cnt + 1);
		 this.text(this.text() + '-' + this.data('cnt'));
		 };
		 var obServerCommon = function () {
		 this.toggleClass('bld');
		 };
		 */
		
		items.each ( function ( idx, node ) {
			var el = window.wgm.$ ( node );
			el
				.empty ()
				.append ( '<span>ID: ' + self.descriptor.id + ' ' + (idx + 1) + '</span>' )
			//.on('click', handler.bind(el))
			;
			
			console.info ( typeof node.attributes );
			console.info ( node.attributes.filter ( function ( val ) {
				var arr = val.split ( '=' );
				console.info ( arr[ 0 ] );
				return true;
			} ) );
			
			
			//channel.addListener('wdgt:click', obServer.bind(el));
			//channels.get('common').addListener('wdgt:click', obServerCommon.bind(el));
		} );
		
		if ( options.debug && options.debug.timing ) console.timeEnd ( 'wrapIFrame-' + this.descriptor.id );
	};
	
	return window.wrappers = function ( params ) {
		var prefix = params && params.prefix ? params.prefix + '-' : '';
		return {
			btn   : {
				selector : '.wdgt[data-' + prefix + 'view="btn"]',
				decorator: wrap,
				channel  : 'channel-btn'
			}
			, info: {
				selector : '.wdgt[data-' + prefix + 'view="info"]',
				decorator: wrapIFrame
			}
		};
	};
	
}) ( 'Main Wrappers' );
