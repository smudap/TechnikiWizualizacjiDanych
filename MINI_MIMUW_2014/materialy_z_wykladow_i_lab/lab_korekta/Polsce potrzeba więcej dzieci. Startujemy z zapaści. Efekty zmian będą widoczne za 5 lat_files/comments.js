window.innerShiv=function(){function h(c,e,b){return/^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i.test(b)?c:e+"></"+b+">"}var c,e=document,j,g="abbr article aside audio canvas datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video".split(" ");return function(d,i){if(!c&&(c=e.createElement("div"),c.innerHTML="<nav></nav>",j=c.childNodes.length!==1)){for(var b=e.createDocumentFragment(),f=g.length;f--;)b.createElement(g[f]);b.appendChild(c)}d=d.replace(/^\s\s*/,"").replace(/\s\s*$/,"").replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"").replace(/(<([\w:]+)[^>]*?)\/>/g,h);c.innerHTML=(b=d.match(/^<(tbody|tr|td|col|colgroup|thead|tfoot)/i))?"<table>"+d+"</table>":d;b=b?c.getElementsByTagName(b[1])[0].parentNode:c;if(i===!1)return b.childNodes;for(var f=e.createDocumentFragment(),k=b.childNodes.length;k--;)f.appendChild(b.firstChild);return f}}();

gazeta_pl.readPageData = function() {

	    var
	        uri = document.location.href,
	        m = null,
	        cl = $('body').attr('class').split(' '),
	        i = 0,
	        mp = null,
	        mpp = '',
	        l = cl.length,
	    
	        res = {
	            pageType: null,
	            pageId: null,
	            articleId: null,
	            text: null,
	            pageRoot: null
	        };
	  
	    if (m = uri.match(/\/([-0-9a-zA-Z]+),([0-9]+)(?:,([0-9]+),?([^\.]+)?)?\./)) {
	        res.text = m.pop();
	        res.articleId = m.pop();
	        res.pageId = m.pop();
	        res.pageType = m.pop();
	    }
	  
	    for (; i < l; i++) {
	        if (mp = cl[i].match(/path_(.*)/)) {
	            if (!(mpp = mp.pop()).match(/^[0-9]+$/)) {
	                res.pageRoot = mpp;
	            }
	        }
	    }
	  
	    return res;

};


gazeta_pl.ClipCopy = {

    hash: {},
    index: 0,
    
    use: function(options) {
  
        var
            id = '',
      
            vars = {
                path: options.path,
                getter: 'gazeta_pl.ClipCopy.hash.getter' + gazeta_pl.ClipCopy.index,
                callback: 'gazeta_pl.ClipCopy.hash.callback' + gazeta_pl.ClipCopy.index,
                domain: options.domain
            };
    
        gazeta_pl.ClipCopy.hash['getter' + gazeta_pl.ClipCopy.index] = function() {
            return options.target[options.attr];
        }
    
        gazeta_pl.ClipCopy.hash['callback' + gazeta_pl.ClipCopy.index] = function() {
            if (typeof options.onClick == 'function') options.onClick();
        }
    
        if (!(id = options.button.getAttribute('id'))) {
            id = 'clipCopyFlashHolder' + gazeta_pl.ClipCopy.index;
            options.button.setAttribute('id', id);
        }
    
        swfobject.embedSWF(options.uri, id, options.width, options.height, '10', '', vars, {allowScriptAccess: 'always', wmode: 'opaque'}, null, function() {
            if (typeof options.onEmbed == 'function') options.onEmbed();
        });

    }

};

(function(){
	/* FILE: /portal/src/gazeta.rtc.js */

	gazeta_pl.RTC = {
	
	    COMMENT_URI: '/fix/cms/opinions/opinions-action.jsp',
	    COMMENTS_COUNT: 3,
	    OLDER_ENTRIES_COUNT: 10,
	    POWER_ENTRY_COOKIE: 'rtc_pe',
	
	    servletURI: '',
	    loginURI: '',
	    logoutURI: '',
	    registerURI: '',
	    title: document.title,
	
	    initialData: null,
	
	    single: false,
	    busy: false,
	    focused: true,
	    firstComments: true,
	    firstCheck: true,
	
	    titleInterval: null,
	
	    toButtonsId: [],
	    
	    userLogin: '',
	    newEntries: [],
	    olderEntries: [],
	    noOldEntries: false,
	
	    init: function() {
	
	        var 
	            me = gazeta_pl.RTC,
	            encURI = encodeURIComponent(document.location.href),
	            intervalCheck = 0,
	            buttons = gazeta_pl.toButtonsInfo,
	            btnCode = '',
	            intervalUpdate = 0,
	            hash = document.location.hash,
	            tempMod = 0;
	                
	
	        tempMod = $('.mod_rtc2012').hasClass('rtc_moderator') ? 1 : 0;
	        
	        if (tempMod == 1) {
	
	            setTimeout(function() {
	            
	                $('#page .gazeta_rtc2012_body > ul li .mod_comments section.content').each(function() {
	                    
	                    var 
	                        $t = $(this),
	                        $f = null,
	                        action = $t.parent().parent().find('article.entry a').attr('href'),
	                        actionval = $t.parent().attr('data-id'),
	                        root = window.location.href.split("/")[3],
	                        
	                    htm = (
	                        '<form method="post" action="' + action + '" name="cenzuraForm">' +
	                            '<fieldset class="hidden">' +
	                                '<input type="hidden" value="" name="back">' +
	                                '<input type="hidden" value="' + root + '" name="root">' +
	                                '<input type="hidden" value="' + actionval + '" name="bytXx">' +
	                                '<input type="hidden" value="1" name="opinions.setState">' +
	                                '<input type="hidden" value="" name="action">' +
	                            '</fieldset>' +
	                            '<fieldset class="buttons">' +
	                                '<p class="c0">' +
	                                    '<button data-action="delete" type="submit"><span>Usu\u0144</span></button>' +
	                                    '<button data-action="spam" type="submit"><span>Spam</span></button>' +
	                                    '<button data-action="markDelete" type="submit"><span>Cenzuruj</span></button>' +
	                                    '<button data-action="unemphasise" type="submit"><span>Cofnij wyr\u00f3\u017cnienie</span></button>' +
	                                '</p> <!-- .c0 -->' +
	                                '<p class="c1">' +
	                                    '<button data-action="emphasise" type="submit"><span>Wyr\u00f3\u017cnij</span></button>' +
	                                    '<button data-action="publish" type="submit"><span>Przywr\u00f3\u0107/publikuj</span></button>' +
	                                '</p> <!-- .c1 -->' +
	                            '</fieldset>' +
	                            '<fieldset class="mark">' +
	                                '<label>' +
	                                    '<input type="checkbox" data-action="markAll">' +
	                                    'Zaznacz wszystkie' +
	                                '</label>' +
	                            '</fieldset>' +
	                        '</form>'
	                    );
	                    
	                    $(this).find('ul').before(htm).parent().addClass('modForm');
	                    $f = $t.find('form[name="cenzuraForm"]');
	                    gazeta_pl.Comments.initMod($t, $f);
	                    
	                });
	                
	            }, 5000);
	        }
	        
	        me.$target = $('.mod_rtc2012');
	        if (!me.$target.length) return;
	             
	        me.$target = me.$target.eq(0);
	        me.initialData = me.$target.gazeta(gfunc.readData);
	        me.servletURI = 'http://' + me.initialData.base + '/wall/wallsport.servlet'; 
	        
	        me.loginURI = gazeta_pl.readParam('loginForm') + '?back=' + encURI;
	        me.logoutURI = '/logout?back=' + encURI;
	        me.registerURI = gazeta_pl.readParam('registerUserForm') + '?back=' + encURI;
	        
	        me.$indicator = $('<div id="gazeta_rtc2012_indicator"><div><p><span></span></p></div></div>').prependTo('.rtc2012_top .gazeta_rtc2012_body');
	        me.$olderIndicator = $('<div id="gazeta_rtc2012_older_indicator"></div>').appendTo('.rtc2012_bottom .gazeta_rtc2012_body');
	        me.firstId = $('.rtc2012_bottom .gazeta_rtc2012_body > ul > li:last').attr('data-id');
	
	        if (!me.initialData.lastId) me.single = true;
	        
	        for (btnCode in buttons) {
	            me.toButtonsId.push(btnCode);
	        }
	        
	        $('.gazeta_rtc2012_body a[data-action="commentsToggle"]').on('click', function(e) {
	            var 
	                $t = $(this),
	                $p = $(this).parents('li').eq(0);
	    
	            if ($t.hasClass('exp')) {
	                $t.removeClass('exp');
	                $p.find('article.mod_comments > section.form').hide();
	                $p.find('#gazeta_rtc2012_fake_commentInput').show();
	            } else {
	                $t.addClass('exp');
	                $p.find('article.mod_comments').prepend($p.find('article.mod_comments > section.form'));
	                $p.find('article.mod_comments > section.form').show()
	                    .find('textarea').focus();
	                $p.find('#gazeta_rtc2012_fake_commentInput').hide();
	            }
	
	            return false;
	        });
	        
	        $('#gazeta_rtc2012_fake_commentInput').on('click', function() {
	            var $t = $(this);
	               
	            $t.parents('li').eq(0).find('a[data-action="commentsToggle"]').addClass('exp');
	            $t.parent().find('section.form').insertAfter($t).show().find('textarea').focus();
	            $t.hide();
	        });
	        
	        $('.mod_rtc2012:not(.single) article.mod_comments section.form form').on('submit', function() {
	            var 
	                $t = $(this),
	                $p = $(this).parents('li').eq(0),
	                $username = $t.find('input[name="username"]').eq(0),
	                $tresc = $t.find('textarea[name="tresc"]').eq(0),
	                $msg = $p.find('> div.msg'),
	                msg = '';
	            
	            $msg.remove();
	            
	            if (!$.trim($tresc.val())) {
	                msg = 'Zapomnia\u0142e\u015b o wpisaniu komentarza :)';    
	            }
	            
	            if ($username.length && !$.trim($username.val())) {
	                msg = 'Musisz si\u0119 przedstawi\u0107 - wpisz tymczasowy Nick lub zaloguj si\u0119';
	            } 
	            
	            if (msg) {
	                $p.find('article.entry').after('<div class="msg error"><p>' + msg + '</p></div>');
	                setTimeout(function() {
	                    $p.find('> div.msg').fadeOut('fast', function() { $(this).remove(); });
	                }, 5000);
	                return false;
	            }
	                    
	        });
	
	        $('.gazeta_rtc2012_body article.entry footer a[data-action="fbShare"]').on('click', function() {
	            var 
	                uri = me.generateEntryURI($(this).parents('li').eq(0).attr('data-id')),
	                title = $('title').text() || $('title').html();
	
	            open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(uri) + '&t=' + encodeURIComponent(title), '', 'width=640,height=620');
	            return false;
	        });
	
	        $('.gazeta_rtc2012_body article.mod_comments section.form p.msg_error').each(function() {
	            $(this).parents('li').find('article.entry footer a[data-action="commentsToggle"]').click();
	            document.location.hash = '#' + $(this).parents('section.form').attr('id');
	        });
	        
	        $('.gazeta_rtc2012_body li.power a[href^="#rtc"]').on('click', function() {
	            var 
	                 $t = $(this),
	                 id = $t.attr('href').replace('#rtc',''),
	                 $elem = $('.gazeta_rtc2012_body li[data-id="'+id+'"]');
	                 
	            if ($elem.length) {
	                $('html,body').animate(
	                    {
	                       scrollTop: $elem.offset().top - 10
	                    },
	                    {
	                        duration: 1000,
	                        complete: function() {
	                            $elem.addClass('new').show();
	                            setTimeout(function() {
	                                $elem.animate(
	                                    { 
	                                        backgroundColor: '#fff'
	                                    },
	                                    {
	                                        duration: 1000,
	                                        complete: function() {
	                                            $elem.removeClass('new').removeAttr('style');
	                                        }
	                                    }
	                                );
	                            }, 500);
	                        }
	                    }
	                ); 
	            }
	            
	            return false;
	        });
	
	        $('#gazeta_rtc2012_other_entries a').on('click', function() {
	            var $elem = $('.rtc2012_bottom');
	                 
	            if ($elem.length) {
	                $('html,body').animate(
	                    {
	                       scrollTop: $elem.offset().top - 10
	                    },
	                    {
	                        duration: 1000
	                    }
	                ); 
	            }
	            
	            return false;
	        });
	
	        me.$indicator.click(me.onIndicatorClick);
	
	        me.pageRoot = gazeta_pl.Comments.pageRoot;
	        gazeta_pl.Comments.pageId = me.getDzialXX();
	
	        if (me.single) {
	            $('.mod_rtc2012').addClass('single');
	        } else {
	            $(document).bind('keydown keypress keyup', function(e) {  
	                if (e.keyCode == 116 && e.charCode == 0) {
	                    if (e.type == 'keyup') {
	                        $('html,body').animate(
	                            {
	                                scrollTop: $('#gazeta_article, .mod_gamecenter2012').offset().top - 10
	                            },
	                            {
	                                duration: 1000
	                            }
	                        );
	                        me.onIntervalCheck();
	                    }
	                    return false;
	                }
	            });
	        
	            $('.rtc2012_top .gazeta_rtc2012_body > ul > li:first-child article.mod_comments').append($('<div id="gazeta_rtc2012_fake_commentInput"></div>'));
	            
	            intervalCheck = me.initialData.intervalCheck ? parseInt(me.initialData.intervalCheck, 10) : 0;
	            intervalUpdate = me.initialData.intervalUpdate ? parseInt(me.initialData.intervalUpdate, 10) : 0;
	            
	            me.onIntervalUpdate(true);
	            
	            if (!$('.mod_rtc2012 .pages').length) {
	                me.getOlderEntries();
	            
	                $(window)
	                    .blur(me.onWindowBlur)
	                    .focus(me.onWindowFocus)
	                    .scroll(me.onWindowScroll);
	
	                if (intervalCheck) {
	                    me.onIntervalCheck();
	                    setInterval(me.onIntervalCheck, intervalCheck * 1000);
	                }
	                if (intervalUpdate) {
	                    setInterval(me.onIntervalUpdate, intervalUpdate * 1000);
	                }
	            }            
	        }
	    },
	
	    getDzialXX: function() {
	
	        var xx = 0,
	            uri = document.location.href,
	            ary = uri.split('/').pop().split(',');
	
	        if (ary.length > 1) {
	            xx = parseInt(ary[1], 10);
	            if (xx == '0' && gazeta_pl.documentParam) xx = gazeta_pl.documentParam['xxDzial'] || '0';
	        }
	            
	        return xx;
	    },
	    
	    generateEntryURI: function(xx) {
	        
	        var 
	            loc = document.location,
	            commas = ',,,';
	        
	        if (loc.pathname.indexOf('/2,') > -1) {
	            commas = ',';
	        }
	        
	        return loc.protocol + '//' + loc.host + loc.pathname.replace(/\.html/, commas + xx + '.html');   
	    },
	    
	    readPageData: function() {
	
	        var data = gazeta_pl.readPageData();
	
	        if (data.pageId == '0' && gazeta_pl.documentParam) data.pageId = gazeta_pl.documentParam['xxDzial'] || '0';
	
	        return data;
	    },
	
	    updateTime: function() {
	
	        var
	            me = gazeta_pl.RTC,
	            now = new Date();
	
	        me.$target.find('header > time').each(function() {
	
	            var 
	                stamp = $(this).attr('pubtime'),
	                time = new Date(stamp),
	                diff = 0,
	                helper = '',
	                result = '';
	            
	            if (isNaN(time)) time = new Date(stamp.replace(/-/g,'/').replace(/T/,' ').replace(/\+/,' +').replace(/:([0-9]{2})$/, '$1'));
	
	            diff = now - time;
	            diff = ~~(diff / 60000);
	
	            if (diff < 10) {
	                result = 'przed chwil\u0105';
	            } else if (diff < 60) {
	                helper = diff > 20 && diff % 10 > 1 && diff % 10 < 5 ? 'y' : '';
	                result = diff + ' minut' + helper + ' temu';
	            } else if (diff < 70) {
	                result = 'oko\u0142o godziny temu';
	            } else {
	                result = ('0' + time.getHours()).slice(-2) + ':' + ('0' + time.getMinutes()).slice(-2);
	                if (diff >= 1440) {
	                    result = time.getFullYear() + '-' + ('0' + (time.getMonth() + 1)).slice(-2) + '-' + ('0' + time.getDate()).slice(-2) + ' ' + result;
	                }
	            }
	
	            $(this).find('a').text(result);
	        });
	    },
	
	    onFirstComments: function() {
	
	        var uri = gazeta_pl.parseURI();
	
	        if (uri.entryId) {
	            $tmp = $('.gazeta_rtc2012_body > ul > li[data-id="' + uri.entryId.replace(/#.*$/, '') + '"]');
	            if ($tmp.length) {
	                $tmp.find('article.entry').after('<div class="msg"><p>Tw\u00f3j komentarz pojawi si\u0119 za chwil\u0119</p></div>');
	                setTimeout(function() {
	                    $tmp.find('> div.msg').fadeOut('fast', function() { $(this).remove(); });
	                }, 5000);
	                $(window).scrollTop($tmp.offset().top);
	            }
	        }
	
	    },
	
	    onIndicatorClick: function() {
	
	        var
	            me = gazeta_pl.RTC,
	            browser = gazeta_pl.browserData();
	            
	        $('html,body').animate(
	            {
	                scrollTop: $('#gazeta_article, .mod_gamecenter2012').offset().top - 10
	            },
	            {
	                duration: 1000
	            }
	        );
	        if (browser.app == 'ie' && browser.ver == 8) me.addNewEntries();
	        me.moveIndicator();
	        
	    },
	       
	    moveIndicator: function(show) {
	    
	        var
	            me = gazeta_pl.RTC,
	            pos = show ? '30px' : '-50px';
	            
	        me.$indicator.find('div').animate(
	            {
	                top: pos
	            },
	            {
	                duration: 1000,
	                complete: function() {
	                    if (!show) me.$indicator.removeClass('new');
	                }
	            }
	        );
	        
	    },
	
	    collectIds: function(visible) {
	
	        var
	            entries = $('.gazeta_rtc2012_body > ul > li'),
	            result = [];
	            
	        if (visible) {
	            entries = $('.gazeta_rtc2012_body > ul > li:screen');
	        }
	
	        entries.each(function() {
	            result.push(parseInt($(this).attr('data-id'), 10));
	        });
	
	        return result.sort().join(',');
	    },
	
	    generateComments: function(id) {
			
	         var
	             me = me = gazeta_pl.RTC,
	             htm = '',
	             ts = new Date().getTime();
	  
	         htm += '<article class="mod mod_comments" data-opinions-servlet="' + gazeta_pl.RTC.COMMENT_URI + '" data-xx="23" data-id="' + id + '" data-tree="0">';
	         htm += '<section class="content"></section>';
	         htm += '<section class="form">';
	         htm += '<form name="opinia" method="post" action="' + gazeta_pl.RTC.COMMENT_URI + '">';
	         htm += '<fieldset class="userLogin">';
	  
	         if (me.userLogin) {
	             htm += '<p class="author">' + me.userLogin + ' <a data-action="logout" href="' + gazeta_pl.RTC.logoutURI + '">wyloguj</a></p>';
	         } else {
	             htm += '<label><span>Login:</span> <input type="text" value="" name="username"></label>';
	             htm += '<label><span>Has\u0142o:</span> <input type="password" value="" name="password"></label>';
	             htm += '<label class="pad"><input type="checkbox" value="1" name="remember"> Zapami\u0119taj</label>';
	             htm += '<p><a href="' + gazeta_pl.RTC.loginURI + '">Zaloguj si\u0119</a>. Je\u015bli nie posiadasz konta <a href="' + gazeta_pl.RTC.registerURI + '">zarejestruj si\u0119</a>.</p>';
	         }
	  
	         htm += '</fieldset>';
	  
	         htm += '<fieldset class="comment">';
	         htm += '<textarea cols="80" rows="6" name="tresc"></textarea>';
	         htm += '<button type="submit">Wy\u015blij</button>';
	  
	         htm += '<input type="hidden" value="' + document.location.protocol + '//' + document.location.host + document.location.pathname + '" name="back">';
	         htm += '<input type="hidden" value="' + ts + '_' + id + '" name="eback">';
	         htm += '<input type="hidden" value="' + id + '" name="articleId">';
	         htm += '<input type="hidden" value="0" name="oxx">';
	         htm += '<input type="hidden" value="0" name="voxx">';
	         htm += '<input type="hidden" value="' + id + '" name="bxx">';
	         htm += '<input type="hidden" value="1" name="opinions.save">';
	         htm += '<input type="hidden" value="' + ts + '" name="token">';
	         htm += '<input type="hidden" value="23" name="xxJsp">';
	         htm += '<input type="hidden" value="' + me.getDzialXX() + '" name="xxDzial">';
	         htm += '<input type="hidden" value="' + me.pageRoot + '" name="root">';
	         htm += '<input type="hidden" name="rememberme">';
	         htm += '<input type="hidden" value="send" name="action">';
	  
	         htm += '</form>';
	         htm += '</section>';
	         htm += '<footer></footer>';
	         htm += '<p class="voteNeedLogin">Aby oceni\u0107 <a href="' + gazeta_pl.RTC.loginURI + '">zaloguj si\u0119</a> lub <a href="' + gazeta_pl.RTC.registerURI + '">zarejestruj</a><a href="#" class="btnClose">X</a></p>';
	         htm += '</article>';
	  
	         return htm;
	
	    },
	
	    updateEntry: function(id, toButtons, comments) {
	
	        var
	            i = '',
	            j = 0,
	            l = 0,
	            $entry = $('.gazeta_rtc2012_body > ul > li[data-id="' + id + '"]'),
	            $btns = $entry.find('div.toButtons > ul > li'),
	            $btn = null,
	            uri = gazeta_pl.RTC.generateEntryURI(id),
	            $span = null;
	            
	        if (comments) {
	
	            if (comments.add && (l = comments.add.length)) {
	                for (i = 0; i < l; i++) {
	                    delete comments.add[i].parentId;
	                    comments.add[i].dataPermalink = uri + '#opinion' + comments.add[i].entryId;
	                }
	            }
	
	            gazeta_pl.Comments.update(id, comments);
	        }
	
	        for (i in toButtons) {
	            toButtons[i] = parseInt(toButtons[i], 10);
	            $btn = $btns.filter('[data-category="' + i + '"]');
	            $span = $btn.find('span');
	
	            if ($span.length && toButtons[i] == 0) $span.remove();
	            if (toButtons[i] == 0) continue;
	
	            if (!$span.length) $btn.append($span = $('<span>'));
	            $span.text(toButtons[i]);
	        }
	
	        gazeta_pl.Comments.limitLength(id, gazeta_pl.RTC.COMMENTS_COUNT, comments.count, uri);
	
	    },
	
	    setTitle: function(title) {
	
	        var 
	            me = gazeta_pl.RTC,
	            flag = true;
	
	        if (me.titleInterval) clearInterval(me.titleInterval);
	        document.title = title + ' - ' + me.title;
	
	        me.titleInterval = setInterval(function() {
	            if (gazeta_pl.RTC.focused) {
	                gazeta_pl.RTC.onWindowFocus();
	                return;
	            }
	            document.title = flag ? me.title : title + ' - ' + me.title;
	            flag = !flag;
	        }, 1000);
	
	    },
	
	    onWindowFocus: function() {
	        var me = gazeta_pl.RTC;
	
	        if (me.titleInterval) clearInterval(me.titleInterval);
	        document.title = me.title;
	        me.focused = true;
	        me.onWindowScroll();
	    },
	
	    onWindowBlur: function() {
	        gazeta_pl.RTC.focused = false;
	    },
	    
	    onWindowScroll: function() {
	    
	        var
	            me = gazeta_pl.RTC;
	         
	        if (me.$indicator.hasClass('new') && me.$indicator.gazeta(gfunc.position) == 'screen' && me.focused) {
	            me.addNewEntries();
	            me.moveIndicator();
	        }
	        
	        if (me.$olderIndicator.gazeta(gfunc.position) != 'below') {
	           me.addOldEntry();
	        }
	        
	    },
	    
	    addOldEntry: function() {
	        
	        var 
	            me = gazeta_pl.RTC,
	            l = me.olderEntries.length,
	            $tmp = null,
	            $script = null;
	        
	        if (l == 0) {
	          if (!me.noOldEntries) me.getOlderEntries();
	          return;
	        }
	        
	        me.$olderIndicator.addClass('loading');
	        
	        htm = me.generateEntryHTML(me.olderEntries.shift(), true);
	       
	        $script = $(htm).filter('script');
	        $('.rtc2012_bottom .gazeta_rtc2012_body > ul').append($tmp = $(innerShiv(htm, false)));
	            
	        gazeta_pl.Comments.registerContainer($tmp.find('article.mod_comments'));
	                    
	        $tmp.addClass('old');
	        setTimeout(function() {
	            $tmp.slideDown(500, function() {
	                $(this).removeClass('old');
	                me.$olderIndicator.removeClass('loading');
	                if ($script.length) {
	                    $(this).append($script);
	                    gazeta_pl.EmbedContent.flash();
	                    gazeta_pl.flash_holders = [];
	                }
	            }); 
	        }, 500);
	    },
	    
	    getOlderEntries: function(entryId) {
	        var
	            me = gazeta_pl.RTC,
	            id = me.$target.attr('data-id'),
	            data = {
	                'type': 'oldentries',
	                'id': id,
	                'odwrocenie': true,
	                'entryId': entryId || me.firstId,
	                'howMany': (entryId ? 1 : me.OLDER_ENTRIES_COUNT),
	                'log': true
	            };
	        
	        if (me.loading == true) return;
	        me.loading = true;
	        me.$olderIndicator.addClass('loading');
	        
	        gazeta_pl.jsonp(me.servletURI, data, 'gazeta_pl.RTC.onOlderEntries');
	    },
	    
	    onOlderEntries: function(data) {
	    
	        var
	            me = gazeta_pl.RTC,
	            data = data || {},
	            l = 0,
	            i = 0;
	        
	        if (!data.error) {
	            l = parseInt(data.oldEntries.length, 10);
	        
	            if (!l || l < me.OLDER_ENTRIES_COUNT) {
	                me.noOldEntries = true;
	            } 
	            if (l) {
	                for(; i < l; i++) {
	                    me.olderEntries.push(data.oldEntries[i]);
	                } 
	                me.firstId = data.oldEntries[i-1].xx;
	                me.userLogin = data.userLogin;
	            }
	        }
	        
	        me.loading = false;
	        me.$olderIndicator.removeClass('loading');
	    },
	    
	    generateEntryHTML: function(entry, withComments) {
	        var
	            me = gazeta_pl.RTC,
	            buttons = gazeta_pl.toButtonsInfo,
	            btnCode = '',
	            btnText = '',
	            htm = '',
	            uri = '',
	            noComments = gazeta_pl.readParam('komentarze') == 'nie',
	            spec = [
	                ['urgent','PILNE'],
	                ['goal','GOOOOOOL'],
	                ['matchEnd','KONIEC MECZU'],
	                ['correspondent','KORESPONDENT']
	            ];
	            
	        uri = me.generateEntryURI(entry['xx']);
	        
	        htm += '<li' + (entry['pilneTyp'] ? ' class="' + spec[entry['pilneTyp']-1][0] + '"' : '') + ' data-id="' + entry['xx'] + '">';
	        htm += '<article class="entry"><header>';
	        htm += entry['pilneTyp'] ? '<p class="spec">' + spec[entry['pilneTyp']-1][1] + '</p>' : '';        
	        
	        if (entry['czas']) {
	            htm += '<strong class="time"><a href="' + uri + '">' + entry['czas'] + '</a></strong>';
	        } else if (entry['min']) {
	           htm += '<strong class="time"><a href="' + uri + '">' + entry['min'] + '. min.'+(entry['min_plus'] ? ' + ' + entry['min_plus'] : '')+'</a></strong>';
	        } else {
	            htm += '<time pubtime="' + entry['dataISO8601'] + '"><a href="' + uri + '">' + entry['data'] + '</a></time>';
	        }
	        
	        if (entry['urlObrazka']) {
	            htm += '<div class="imgw"><img src="' + entry['urlObrazka'] + '" alt="" /></div>';
	        }
	        if (entry['klasaIkony']) {
	            htm += '<div class="imgw"><span class="ico ' + entry['klasaIkony'] + '"></div>';
	        }
	        
	        htm += '</header>';
	        htm += '<div class="content"><section class="body">';
	        
	        if (entry['autorZdjXX']) {
	          htm += '<div class="author"><span><img src="' + PhotoAPI.photoFromXX(entry['autorZdjXX'], 'U', 'jpg') + '" />';
	          if (entry['autorNazwa']) htm += ' <b>' + entry['autorNazwa'] + '</b>';
	          htm += '</span></div>';
	        }
	        
	        htm += entry['body'] + '</section>';
	        htm += '<footer><div class="c0">';
	
	        if (!noComments && entry['komentarze']) htm += '<a data-action="commentsToggle" href="#"><span>Skomentuj</span></a>';
	        if (entry['likeNotka']) htm += '<div class="fb"><a data-action="fbShare" href="#">Podziel si\u0119</a></div>';
	
	        htm += '</div><div class="c1">';
	
	        if (entry['oceniacze'] && buttons) {
	            htm += '<div class="toButtons" data-table-name="zczuba_wpisy" data-article-xx="' + entry['xx'] + '" data-dzial-xx="' + me.getDzialXX() + '"><ul>';
	
	            for (btnCode in buttons) {                 
	                if (!btnCode.match(/^[0-9]+$/)) continue;
	
	                btnText = buttons[btnCode];
	                htm += '<li data-category="' + btnCode + '"><button><em>' + btnText + '</em></button></li>';
	            }
	
	            htm += '</ul></div>';
	        }
	
	        htm += '</div></footer>';
	        htm += '</div></article>';
	
	        if (withComments) {
	            if (!noComments && entry['komentarze']) {
	                htm += gazeta_pl.RTC.generateComments(entry['xx']);
	            }
	        }
	        
	        htm += '</li>';
	        
	        return htm;
	    },
	    
	    onIntervalCheck: function() {
	
	        var 
	            me = gazeta_pl.RTC, 
	            page = '',
	            data = {
	                'type': 'newentries',
	                'odwrocenie': 'true',
	                'id': me.$target.attr('data-id'),
	                'log': 'true',
	                '_': ~~(new Date().getTime() / 5000)
	            };
	
	        gazeta_pl.jsonp(me.servletURI, data, 'gazeta_pl.RTC.onCheck');
	
	    },
	
	    onIntervalUpdate: function(first) {
	
	        var
	            me = gazeta_pl.RTC,
	            id = me.$target.attr('data-id'),
	            data = {
	                'type': 'getInfo',
	                'id': id,
	                'size': me.COMMENTS_COUNT,
	                'objectIds': (first ? me.collectIds() : me.collectIds(true)),
	                'root': me.pageRoot,
	                'dzialXx': me.getDzialXX(),
	                'xxButtons': me.toButtonsId.join(','),
	                'jspXx': gazeta_pl.documentParam['jspXx'],
	                'log': true
	            };
	
	        gazeta_pl.jsonp(me.servletURI, data, 'gazeta_pl.RTC.onUpdate');
	
	    },
	
	    onCheck: function(data) {
	
	        var 
	            me = gazeta_pl.RTC,
	            data = data || {},
	            htm = '',
	            title = '',
	            i = 0,
	            l = 0,
	            entry = {},
	            entries = $('.gazeta_rtc2012_body > ul > li'),
	            suffix = gazeta_pl.readParam('rtcNewEntriesMessageSuffix');
	            
	        if (!data.error) {
	
	            if (!me.firstCheck) {
	                for (i = 0, l = data.newEntries.length; i < l; i++) {
	                    
	                    entry = data.newEntries[i];
	                    entry['xx'] = parseInt(entry['xx'], 10);
	                    
	                    if (!entries.filter('[data-id="'+ entry['xx'] +'"]').length && !me.newEntries.filter(function(el){ return (el.xx == entry['xx']) }).length) {
	                        me.newEntries.push(entry);
	                    }
	                    
	                }
	                
	                if (l = me.newEntries.length) {
	                
	                    if (l == 1) {
	                        title = '1 nowa';
	                        htm = 'Czeka na Ciebie 1 nowa wiadomo\u015b\u0107. ' + suffix;
	                    } else if ((l % 100 < 10 || l % 100 > 20) && l % 10 > 1 && l % 10 < 5) {
	                        title = l + ' nowe';
	                        htm = 'Czekaj\u0105 na Ciebie ' + l + ' nowe wiadomo\u015bci. ' + suffix;
	                    } else {
	                        title = l + ' nowych';
	                        htm = 'Czeka na Ciebie ' + l + ' nowych wiadomo\u015bci. ' + suffix;
	                    }
	                
	                    me.$indicator
	                        .addClass('new')
	                        .find('span').text(htm);
	                
	                    if (!me.focused) me.setTitle(title);
	                    if (me.$indicator.gazeta(gfunc.position) == 'screen') {
	                        if (me.focused) me.addNewEntries();
	                    } else {
	                        me.moveIndicator(true);
	                    }
	                }
	            } else {
	                me.firstCheck = false;
	            }          
	            me.showPowerEntry(data.powerEntry); 
	            me.userLogin = data.userLogin; 
	        }
	
	        gazeta_pl.RTC.updateTime();
	
	    },
	    
	    addNewEntries: function() {
	
	        var 
	            me = gazeta_pl.RTC,
	            htm = '',
	            entry = null,
	            $tmp = null,
	            $script = null,
	            uri = '',
	            ts = new Date().getTime(),
	            lastId = parseInt(me.$target.attr('data-last-id'), 10),
	            noComments = gazeta_pl.readParam('komentarze') == 'nie';
	        
	        while (entry = me.newEntries.shift()) {
	
	            entry['xx'] = parseInt(entry['xx'], 10);
	
	            if ($('.gazeta_rtc2012_body > ul > li[data-id="' + entry['xx'] + '"]').length) continue;
	
	            lastId = entry['xx'];
	            
	            htm = me.generateEntryHTML(entry, true);
	            
	            $script = $(htm).filter('script');
	            $('.rtc2012_top .gazeta_rtc2012_body > ul').prepend($tmp = $(innerShiv(htm, false)));
	            
	            gazeta_pl.Comments.registerContainer($tmp.find('article.mod_comments'));
	            
	            (function($elem, $script) {
	            
	              $elem.addClass('new').slideDown(500, function() {
	                setTimeout(function() {
	                  $elem.animate(
	                    { 
	                        backgroundColor: '#fff'
	                    },
	                    {
	                        duration: 1000,
	                        complete: function() {
	                            $elem.removeClass('new');
	                            if ($script.length) {
	                                $elem.append($script);
	                                gazeta_pl.EmbedContent.flash();
	                                gazeta_pl.flash_holders = [];
	                            }
	                        }
	                    }
	                  );
	                }, 1000);
	              });
	            
	            })($tmp, $script);
	
	        }
	        
	        if ($('#gazeta_rtc2012_fake_commentInput').length) {
	            $('#gazeta_rtc2012_fake_commentInput').appendTo($('.rtc2012_top .gazeta_rtc2012_body > ul > li:first-child article.mod_comments'));
	        } else {
	            $('.rtc2012_top .gazeta_rtc2012_body > ul > li:first-child article.mod_comments').append($('<div id="gazeta_rtc2012_fake_commentInput"></div>'));
	        }
	
	        lastId = $('.rtc2012_top .gazeta_rtc2012_body > ul > li:first').attr('data-id');
	        me.$target.attr('data-last-id', '' + lastId);
	
	    },
	
	    onUpdate: function(data) {
	
	        var
	            i = null,
	            data = data || {},
	            list = data['lista'] || {};
	
	        for (i in list) gazeta_pl.RTC.updateEntry(i, list[i].toButtons, list[i].comments);
	        if (gazeta_pl.RTC.firstComments) {
	            gazeta_pl.RTC.firstComments = false;
	            gazeta_pl.RTC.onFirstComments();
	        }
	
	    },
	    
	    showPowerEntry: function(entry) {
	    
	        var 
	            me = gazeta_pl.RTC,
	            htm = '',
	            $tmp = null,
	            header = gazeta_pl.readParam('rtcPowerEntryHeader');
	        
	        if (entry.date && entry.body && $.trim(entry.body.replace(/<.*?>/g, '')) && (!$.cookie(me.POWER_ENTRY_COOKIE + me.initialData.id) || $.cookie(me.POWER_ENTRY_COOKIE + me.initialData.id) < entry.date)) {
	       
	            htm += '<li class="power"><article class="entry"><header><p class="spec">RELACJA NA \u017bYWO</p></header>';
	            htm += '<div class="content"><section class="body">';
	            if (!$.cookie(me.POWER_ENTRY_COOKIE + me.initialData.id) && header) {
	              htm += '<div class="module"><p>'+ header +'</p></div>';
	            }
	            htm += entry.body;
	            htm += '</section></div></article></li>';
	            
	            
	            setTimeout(function() {
	                $('.rtc2012_top .gazeta_rtc2012_body > ul').prepend($tmp = $(innerShiv(htm, false)));
	                       
	                $tmp.addClass('new').slideDown(500, function() {
	                  setTimeout(function() {
	                    $tmp.animate(
	                        { 
	                            backgroundColor: '#fff'
	                        },
	                        {
	                            duration: 1000,
	                            complete: function() {
	                                $tmp.removeClass('new');
	                            }
	                        }
	                    );
	                  }, 1000);
	                });
	            }, 3000);
	            
	            $.cookie(me.POWER_ENTRY_COOKIE  + me.initialData.id, entry.date, {expires: 7});
	        }
	    }
	};

	
	gazeta_pl.Comments = {
	
	    SERVLET_URI: '?action=readComments',
	    SERVLET_UPVOTE: '?action=vote&vote=1',
	    SERVLET_DOWNVOTE: '?action=vote&vote=-1',
	    SERVLET_MORE_CHILD: '?action=getNewTree',
	    SERVLET_REMOVE: '?action=trashVote',
	    MSG_COMMENT_REMOVED: 'Komentarz usuni\u0119ty ze wzgl\u0119du na z\u0142amanie regulaminu.',
	    MSG_COMMENT_TOO_LONG: 'Maksymalna d\u0142ugo\u015b\u0107 tre\u015bci (4000 znak\u00f3w) zosta\u0142a przekroczona!',
	    MAX_COMMENT_LENGTH: 4000,
	    
	    GEMIUS_SHOW_COMMENTS: 'http://gazeta.hit.gemius.pl/hitredir/id=.K3gInw4.z9kYuuDKDqqwreP3wkkk69v7nUh6TzL_tL.j7/stparam=onnecnsfxk/url=',
	    showCommentsImg: null,
	
	    containers: {},
	
	    init: function() {
	        
	        var param = gazeta_pl.RTC.readPageData();
	        if (!$('article.mod_comments').length) return;
	    
	        gazeta_pl.Comments.pageId = param.pageId || $('article.mod_comments').attr('data-page-id');
	        gazeta_pl.Comments.pageRoot = param.pageRoot || $('article.mod_comments').attr('data-root');
	
	        $('article.mod_comments a[data-action="upvote"],article.mod_comments a[data-action="downvote"]').on('click', gazeta_pl.Comments.onCommentVote);
	        $('article.mod_comments a[data-action="remove"]').on('click', gazeta_pl.Comments.onCommentRemove);
	        //$('article.mod_comments a[data-action="cancelReply"],article.mod_comments a[data-replies="getReplies"]').on('click', gazeta_pl.Comments.onReplyCancel);
	        $('article.mod_comments a[data-action="cancelReply"]').live('click', gazeta_pl.Comments.onReplyCancel);
	        $('article.mod_comments a[data-replies="getReplies"]').live('click', gazeta_pl.Comments.onReplyCancel);
	        
	        $('article.mod_comments a[data-replies="getReplies"]').on('click', gazeta_pl.Comments.getReplies);
	        $('article.mod_comments a[data-action="expand"]').on('click', gazeta_pl.Comments.onTreeToggle);
	        
	        $('article.mod_comments a[data-action="older"]').on('click', gazeta_pl.Comments.onTreeOlder);
	        $('article.mod_comments a[data-action="reply"]').on('click', gazeta_pl.Comments.onReply);
	        
	        $('article.mod_comments a[data-action="reply"]').live('click', gazeta_pl.Comments.onReply);
	        
	        $('article.mod_comments p.voteNeedLogin a.btnClose').on('click', gazeta_pl.Comments.onNeedLoginClose);
	        $('article.mod_comments textarea[name="tresc"]').on('keyup paste', gazeta_pl.Comments.onReplyChange);
	        $('article.mod_comments textarea[name="tresc"]').on('focus', gazeta_pl.Comments.onReplyStart);
	        
	        $('article.mod_comments.flex .form .userLogin .inline a').on('click', gazeta_pl.Comments.onDraft);
	        
	        $('article.mod_comments').each(function() {
	            gazeta_pl.Comments.registerContainer($(this));
	        });
	
	        if( !!window.location.hash.match(/opform/g) ) {
	            $('article.mod_comments textarea[name="tresc"]').focus();
	        }
	        gazeta_pl.Comments.initMod();
	        gazeta_pl.Comments.initClipCopy();
	        gazeta_pl.Comments.initStarVotes();
	        
	    },
	
	    initStarVotes: function() {
	
	        $('article.mod_comments section.form div.vote').each(function() {
	    
	            $(this).find('li')
	                .mouseover(function() {
	    
	                    var 
	                      $par = $(this).parents('div').eq(0),
	                      ind = $(this).parent().find('li').index($(this));
	    
	                    if ($par.hasClass('vote')) {
	                        $par.attr('class', 'vote v' + (ind + 1));
	                    } else {
	                        $par.attr('class', 'v' + (ind + 1));
	                    }
	    
	                })
	                .click(function() {
	    
	                    var 
	                        $par = $(this).parents('div').eq(0),
	                        vote = 0;
	    
	                    $(this).parent().data('vote', (vote = $par.attr('class').match(/v([1-5])/).pop()));
	                    $par.find('input[type="hidden"]').val(vote);
	    
	                });
	    
	            $(this).find('ul').mouseleave(function() {
	    
	                var 
	                    vote = '', 
	                    $par = $(this).parent('div').eq(0);
	    
	                if (vote = $(this).data('vote')) {
	    
	                    if ($par.hasClass('vote')) {
	                        $par.attr('class', 'vote v' + vote);
	                    } else {
	                        $par.attr('class', 'v' + vote);
	                    }
	    
	                } else {
	    
	                    if ($par.hasClass('vote')) {
	                        $(this).parent().attr('class', 'vote');
	                    } else {
	                        $(this).parent().attr('class', '');
	                    }
	    
	                }
	    
	            });
	    
	        });
	    
	    },
	
	    initMod: function(a,b) {
	
	        var
	            $form = $('article.mod_comments form[name="cenzuraForm"]'),
	            $ctr = $('article.mod_comments section.content.modForm'),
	            $ctr = a || $ctr,
	            $form = b || $form,
	            
	            check = function() {
	  
	                var allc = true;
	          
	                $ctr.find('label.mod input[type="checkbox"]').each(function() {
	                    if (!$(this).attr('checked')) allc = false;
	                });
	          
	                if (allc) {
	                    $ctr.find('input[data-action="markAll"]').attr('checked', 'checked');
	                } else {
	                    $ctr.find('input[data-action="markAll"]').removeAttr('checked');
	                }
	            };   
	
	        if (!$form.length) return;
	
	        $ctr.find('button[data-action]').click(function() {
	  
	            $form.find('input[name="action"]').val($(this).attr('data-action'));
	            $form.find('fieldset').append($ctr.find('input[type="checkbox"]'));
	            $form.submit();
	  
	        });
	  
	        $ctr.find('input[data-action="markAll"]').click(function() {
	  
	            if ($(this).attr('checked')) {
	                $ctr.find('input[data-action="markAll"]').attr('checked', 'checked');
	                $ctr.find('label.mod input[type="checkbox"]').attr('checked', 'checked');
	            } else {
	                $ctr.find('input[data-action="markAll"]').removeAttr('checked');
	                $ctr.find('label.mod input[type="checkbox"]').removeAttr('checked');
	            }
	          
	        });
	  
	        $ctr.find('label.mod input[type="checkbox"]').click(check);
	        check();
	  
	    },
	
	    initClipCopy: function() {
	        var
	            $copy = $('<div id="commentsLinkCopy">'),
	            hide = function() {
	                $copy.css({visibility: 'hidden', bottom: 0, left: -1000});
	                $copy.find('object').css({visibility: 'hidden'});
	                current = '';
	            },
	            current = '';
	       
	        $copy.html('<div><p class="head">Link do komentarza</p><a href="#" data-action="getURLClose">x</a><input type="text" readonly="readonly" value=""><div></div></div>');
	  
	        $('body').append($copy);
	        
	        gazeta_pl.ClipCopy.use({
	            target: $copy.find('input')[0],
	            button: $copy.find('div')[1],
	            attr: 'value',
	            path: 'http://static.gazeta.pl/i/obrazki/lego/5/clipcopy.png',
	            uri: 'http://static.gazeta.pl/i/obrazki/lego/5/clipcopy-0.5.swf',
	            domain: 'http://static.gazeta.pl/',
	  
	            onClick: hide,
	            onEmbed: hide,
	  
	            width: 61,
	            height: 26
	        });
	  
	        $copy.find('a[data-action="getURLClose"]').click(function() {
	            hide();
	            return false;
	        });
	  
	        $('article.mod_comments a[data-action="getURL"]').on('click', function() {
	  
	            var 
	                url = $(this).parents('li.comment').eq(0).attr('data-permalink');
	  
	            $(this).blur();
	  
	            if (current == url) {
	                hide();
	                return false;
	            }
	  
	            current = url;
	  
	            $copy.css({
	                left: $(this).offset().left + $(this).outerWidth() + 4,
	                top: $(this).offset().top - 32,
	                bottom: 'auto',
	                visibility: 'visible'
	            });
	  
	            $copy.find('object').css({visibility: 'visible'});
	            $copy.find('input').val(url).focus().select();
	  
	            return false;
	  
	        });
	  
	    },
	
	    update: function(id, data) {
	
	        var 
	            me = gazeta_pl.Comments,
	            i = 0,
	            l = 0,
	            $article = $('article.mod_comments[data-id='+id+']'),
	            isMod = 0;
	        
	        if (data.votes) {
	            for (i = 0, l = data.votes.length; i < l; i++) {
	                me.setCommentVotes(id, data.votes[i]);
	            }
	        }
	        
	        if (data.add) {
	                            
	            tempMod = $('.mod_rtc2012').hasClass('rtc_moderator') ? 1 : 0;
	            
	   /* */    if (data.isMod == 1 || tempMod == 1){
	                isMod = 1;
	            }   
	
	            for (i = 0, l = data.add.length; i < l; i++) {
	                if (me.findComment(id, data.add[i].entryId)) {
	                    me.updateCommentInfo(id, data.add[i].entryId, data.add[i].date);
	                    me.setCommentVotes(id, data.add[i]);
	                } else if (!me.containers[id].reply) {
	
	                    if ($article.hasClass('flex')) {
	                        me.addCommentFlex(id, data.add[i], isMod);
	                    } else {
	                        me.addComment(id, data.add[i], isMod);
	                    }
	                    
	                }
	            }
	        }
	
	    },
	
	    findComment: function(id, commentId) {
	
	        var $result = gazeta_pl.Comments.containers[id].$target.find('li.comment[data-id="' + commentId + '"]').eq(0);
	        return $result.length ? $result : null;
	
	    },
	
	    updateCommentInfo: function(id, commentId, newDate, newRank) {
	
	        var $target = gazeta_pl.Comments.findComment(id, commentId);
	        $target.find('time').text(newDate);
	
	    },
	
	    setCommentVotes: function(id, data) {
	        var
	            $t = gazeta_pl.Comments.findComment(id, data.entryId || data.id),
	            $article = $t.parents('article.mod_comments'),
	            $vote = $t.find('> section > article > header > div.c1 > p.vote'),
	            $span = $vote.find('span'),
	            $strong = $vote.find('strong');
	        
	        if ($article.hasClass('flex')) {
	            $vote = $t.find('> section > article > .inner > header > div.c1 > p.vote'),
	            $span = $vote.find('span'),
	            $strong = $vote.find('strong');
	        }
	        
	        data.votesCount = typeof data.votesCount == 'undefined' ? data.count : data.votesCount;
	        data.votesRank = typeof data.votesRank == 'undefined' ? data.rank : data.votesRank;
	
	        if (!$span.length) $vote.prepend($span = $('<span>'));
	  
	        if (data.votesRank > 0) {
	            $strong.addClass('plus').removeClass('minus');
	        } else if (data.votesRank < 0) {
	            $strong.removeClass('plus').addClass('minus');
	        } else { 
	            $strong.removeClass('plus').removeClass('minus');
	        }
	        
	        $strong.text(data.votesRank);
	
	        if (data.votesCount == 0) {
	            $span.text('');
	        } else {
	            $span.text('Oceniono ' + data.votesCount + ' raz' + (data.votesCount != 1 ? 'y' : ''));
	        }
	    },
	
	    registerContainer: function($target) {
	
	        var data = null;
	
	        if (!$target.length) return;
	        
	        data = $target.gazeta(gfunc.readData);
	        gazeta_pl.Comments.containers[data.id] = {
	            data: data,
	            $target: $target
	        };
	        
	        if ($target.hasClass('flex')) {
	         
	            var 
	                mod = gazeta_pl.Comments.containers[data.id],
	                commentId = $target.attr('data-id'),
	                sendId = '',
	                uri = gazeta_pl.parseURI();
	            
	            (typeof uri.pId === "undefined") ? sendId = data.id : sendId = uri.pId.split('#').shift();
	    
	            if (gazeta_pl.browserData().app === 'ie') {
	                $target.find('input[placeholder]')
	                    .each(function() {
	                        $(this).val($(this).attr('placeholder')).addClass('placeholder');
	                    })
	                    .on('focus',function() {
	                        if ($(this).val() === $(this).attr('placeholder')) {
	                            $(this).val('').removeClass('placeholder');
	                        };
	                    })
	                    .on('blur',function() {
	                        if ($.trim($(this).val()).length > 0 && $.trim($(this).val()) === $(this).attr('placeholder') || $.trim($(this).val()).length === 0 ) { 
	                            $(this).val($(this).attr('placeholder')).addClass('placeholder');
	                        };                        
	                    });
	            };
	            
	        }
	        
	    },
	    onDraft: function() {
	        
	        var 
	            $article =  $(this).parents('article.mod_comments').eq(0),
	            data = $article.gazeta(gfunc.readData),
	            $target = $(this).parents('li.comment').eq(0),
	            $area = $target.find('.form').find('.comment textarea'),
	            areaValue = $area.val(),
	            commentId = $target.attr('data-id'),
	            sendId = data.id;
	
	        if (typeof commentId == "undefined") {
	            $area = $article.find('.form').find('.comment textarea');
	            areaValue = $area.val();
	        } 
	        else {
	            sendId = commentId;
	        }
	        
	        $.ajax({
	            url: data.opinionsServlet,
	            dataType: 'json',
	            type: "post",
	            async: false,
	            data: {action: 'saveDraft', id: sendId, body: areaValue}
	        });
	        
	    },
	    unregisterContainer: function($target) {
	
	        var data = $target.gazeta(gfunc.readData);
	        delete gazeta_pl.Comments.containers[data.id];
	
	    },
	
	    setPosition: function($target, pos) {
	        
	        var
	            target = $target[0],
	            range = null;
	        
	        $target.focus();
	        if (target.setSelectionRange) {
	            target.setSelectionRange(pos, pos);
	        } else if (target.createTextRange) {
	            range = target.createTextRange();
	            range.collapse(true);
	            range.moveEnd('character', pos);
	            range.moveStart('character', pos);
	            range.select();
	        }
	    },
	
	    setChildCount: function(id, parentId, count) {
	       var
	           $target = gazeta_pl.Comments.findComment(id, parentId),
	           $article = $target.parents('article.mod_comments'),
	           $trigger = $target.find('> section > article > footer a[data-action="expand"]');
	        
	        if ($article.hasClass('flex')) {
	            var 
	                text = ' odpowiedzi ',
	                exp = $target.hasClass('expanded') ? 'Ukryj' : 'Poka\u017c ';
	            
	            count = exp + text + '('+count+')';
	        }           
	           
	       if (!$trigger.length) {
	           $trigger = $('<a data-action="expand" href="#">' + count + '</a>');
	           $target.find('> section > article > footer p.exp').append($trigger);
	       } else {
	           $trigger.text('' + count);
	       }
	    },
	
	    getContainerId: function($child) {
	        return $child.parents('article.mod_comments').eq(0).attr('data-id');
	    },
	
	    addComment: function(id, data, moderator) {
	
	        var 
	            $parent = null,
	            $ul = null,
	  
	            $t = $(
	                '<li class="comment" ' +
	                    'data-parent="' + data.parentId + '" ' +
	                    'data-permalink="' + data.dataPermalink + '" ' + 
	                    'data-id="' + data.entryId + '"' + 
	                    (data.entryEm === 1 ? ' data-em="1"' : '') + 
	                '>'
	            ),
	            
	            htm = (
	                (moderator 
	                    ? '<label class="mod"><input type="checkbox" name="opId" value="' + data.entryId + '"></label>'
	                    : ''
	                ) +
	                '<section>' +
	                    (data.userAvatar 
	                        ? '<div class="imgw"><img src="' + data.userAvatar + '" alt="' + data.userName + '"></div>'
	                        : ''
	                    ) +
	                    '<article class="content">' + 
	                        '<header>' + 
	                            '<div class="c0">' +
	                                '<p class="author">' +
	                                    (data.userUrl ? '<a href="' + data.userUrl + '">' : '') +
	                                    data.userName +
	                                    (data.userUrl ? '</a>' : '') +
	                                '</p>' +
	                                '<time datetime="' + data.date + '">' + data.date + '</time>' +
	                                '<a href="#" data-action="getURL"></a>' + 
	                            '</div>' +
	                            '<div class="c1">' + 
	                                '<p class="vote">' +
	                                    (data.votesCount 
	                                        ? '<span>Oceniono ' + data.votesCount + (data.votesCount === 1 
	                                            ? ' raz' 
	                                            : ' razy'
	                                        ) + '</span>'
	                                        : ''
	                                    ) +
	                                    '<strong class="' + (data.votesRank > 0 ? 'plus' : (data.votesRank < 0 ? 'minus' : '')) + '">' +
	                                      data.votesRank +
	                                    '</strong> ' +
	                                    '<a href="#" data-action="upvote"></a> ' +
	                                    '<a href="#" data-action="downvote"></a>' +
	                                '</p>' +
	                                // '<p class="remove">' +
	                                  // '<a href="#" data-action="remove"></a>' + 
	                                // '</p>' + 
	                            '</div>' +
	                        '</header>' +
	                        '<p>' + data.content + '</p>' +
	                        '<footer>' +
	                            '<div class="c0">' +
	                                '<p>' +
	                                    (data.entryEm === 1 ? 'Komentarz wyr\u00f3\u017cniony' : '') +
	                                '</p>' +
	                            '</div>' +
	                            '<div class="c1">' + 
	                                '<p class="exp"></p>' +
	                                '<p class="reply"><a href="#" data-action="reply">odpowiedz</a></p>' +
	                            '</div>' +
	                        '</footer>' +
	                    '</article>' +
	                '</section>'
	            );
	  
	        $t.html(innerShiv(htm, false));
	
	        if (data.parentId) {
	  
	            $parent = gazeta_pl.Comments.findComment(id, data.parentId);
	            if (!($ul = $parent.find('> ul.child')).length) {
	                $parent.append($ul = $('<ul class="child"></ul>'));
	            }
	  
	        } else {
	  
	            $parent = gazeta_pl.Comments.containers[id].$target;
	
	            if (!$parent.find('section.content').length) {
	                $parent.find('> footer').before(innerShiv('<section class="content"></section>', false));
	            }
	
	            if (!($ul = $parent.find('section.content > ul.child')).length) {
	                $parent.find('section.content').append($ul = $('<ul class="child"></ul>'));
	            }
	         
	        }
	  
	        $ul.prepend($t);
	
	        if (data.parentId) {
	            gazeta_pl.Comments.setChildCount(id, data.parentId, $parent.find('> ul.child > li').length);
	        }
	  
	    },
	    addCommentFlex: function(id, data, moderator) {
	        var 
	            $parent = null,
	            $ul = null,
	  
	            $t = $(
	                '<li class="comment" ' +
	                    'data-parent="' + data.parentId + '" ' +
	                    'data-id="' + data.entryId + '"' + 
	                    (data.entryEm === 1 ? ' data-em="1"' : '') + 
	                    (data.f < 0 ? ' data-removed="1"' : '') + 
	                '>'
	            ),
	            
	            htm = (
	                (moderator 
	                    ? '<label class="mod"><input type="checkbox" name="opId" value="' + data.entryId + '"></label>'
	                    : ''
	                ) +
	                '<section>' + 
	                    (data.userAvatar 
	                        ? '<div class="imgw"><img src="' + data.userAvatar + '" alt="' + data.userName + '"></div>'
	                        : ''
	                    ) +
	                    '<article class="content">' + 
	                        '<div class="inner">' + 
	                        '<header>' + 
	                            '<div class="c0">' +
	                                '<p class="author">' +
	                                    (data.userUrl ? '<a href="' + data.userUrl + '">' : '') +
	                                    data.userName +
	                                    (data.userUrl ? '</a>' : '') +
	                                '</p>' +
	                                '<time datetime="' + data.date + '">' + data.date + '</time>' +
	                            '</div>' +
	                            '<div class="c1">' + 
	                                '<p class="vote">' +
	                                    (data.votesCount && data.votesCount > 0
	                                        ? '<span>Oceniono ' + data.votesCount + (data.votesCount === 1 
	                                            ? ' raz' 
	                                            : ' razy'
	                                        ) + '</span>'
	                                        : ''
	                                    ) +
	                                    '<strong class="' + (data.votesRank > 0 ? 'plus' : (data.votesRank < 0 ? 'minus' : '')) + '">' +
	                                      data.votesRank +
	                                    '</strong> ' +
	                                    '<a href="#" data-action="upvote"></a> ' +
	                                    '<a href="#" data-action="downvote"></a>' +
	                                '</p>' +
	                                // '<p class="remove">' +
	                                  // '<a href="#" data-action="remove"></a>' + 
	                                // '</p>' + 
	                            '</div>' +
	                        '</header>' +
	                        (data.f < 0 ? '<p class="modInfo">Komentarz usuni\u0119ty</p>' : '') +
	                        (data.f == 0 ? '<p class="modInfo">Komentarz oczekuj\u0105cy</p>' : '') +
	                        (data.m < 0 ? '<p class="modInfo">Komentarz ocenzurowany</p>' : '') +
	                        '<p'+ (data.entryEm == 1 ? ' class=highlight' : '') +'>'+data.content + '</p>' +
	                        '<footer>' +
	                            '<div class="c0">' +
	                                '<p>' +
	                                    (data.entryEm === 1 ? 'Komentarz wyr\u00f3\u017cniony' : '') +
	                                '</p>' +
	                            '</div>' +
	                            '<div class="c1">' + 
	                                '<p class="exp"></p>' +
	                                '<p class="reply"><a href="#" data-action="reply">Odpowiedz</a></p>' +
	                            '</div>' +
	                        '</footer>' +
	                        '</div>' +
	                    '</article>' +
	                '</section>'
	            );
	            
	        $t.html(innerShiv(htm, false));
	
	        if (data.parentId) {
	  
	            $parent = gazeta_pl.Comments.findComment(id, data.parentId);
	            if (!($ul = $parent.find('> ul.child')).length) {
	                $parent.append($ul = $('<ul class="child"></ul>'));
	            }
	  
	        } else {
	  
	            $parent = gazeta_pl.Comments.containers[id].$target;
	
	            if (!$parent.find('section.content').length) {
	                $parent.find('> footer').before(innerShiv('<section class="content"></section>', false));
	            }
	
	            if (!($ul = $parent.find('section.content > ul.child')).length) {
	                $parent.find('section.content').append($ul = $('<ul class="child"></ul>'));
	            }
	         
	        }
	  
	        $ul.prepend($t);
	
	        if (data.parentId) {
	            gazeta_pl.Comments.setChildCount(id, data.parentId, $parent.find('> ul.child > li').length);
	        }
	  
	    },
	    getReplies: function() {
	         var 
	                $target = $(this).parents('li.comment').eq(0),
	                id = gazeta_pl.Comments.getContainerId($target),
	                mod = gazeta_pl.Comments.containers[id],
	                base = mod.data.opinionsServlet,
	                root = mod.data.root,
	                jspXx = mod.data.xx,
	                commentId = $target.attr('data-id'),
	                permalink = document.location.href.split('?').shift(),
	                uri = base + gazeta_pl.Comments.SERVLET_MORE_CHILD;
	            
	            $(this).on('click',gazeta_pl.Comments.onReplyCancel);
	
	            if ($target.hasClass('expanded') || $target.hasClass('replies')) return;
	             
	            if (mod.data.paramPass) {
	                uri = base,
	                uri = uri.replace('id', commentId);
	                uri = uri.replace('action', 'getNewTree');
	                uri = uri.replace('vote', '');
	                uri = uri.replace('callback', '');
	            }
	            
	            $.ajax({
	      
	                url: uri,
	                data: { 
	                    id: commentId,
	                    firstChildId: $target.find('li.comment:first').attr('data-id'),
	                    dzialXx: gazeta_pl.Comments.pageId,
	                    root: root,
	                    objectId: id,
	                    permalinkUrl: permalink,
	                    jspXx: jspXx
	                },
	                success: function(json) {
	                    gazeta_pl.Comments.update(id, json);
	                    $target.addClass('replies');
	                }
	      
	            });
	            
	            return false;
	        
	    },
	    onTreeToggle: function() {
	        var 
	            $target = $(this).parents('li.comment').eq(0),
	            $link = $target.find('a[data-action="expand"]');
	
	        if ($target.hasClass('expanded')) {
	            $target.removeClass('expanded');
	            $link.html($link.html().replace('Ukryj','Poka\u017c'))
	
	        } else {
	            $target.addClass('expanded');
	            $link.html($link.html().replace('Poka\u017c','Ukryj'))
	            
	            gazeta_pl.Comments.showCommentsImg = new Image();
	            gazeta_pl.Comments.showCommentsImg.src = gazeta_pl.Comments.GEMIUS_SHOW_COMMENTS + encodeURIComponent(document.location.href);
	        };
	
	        return false;
	
	    },
	    
	    onTreeOlder: function() {
	        
	        var 
	            $target = $(this).parents('li.comment').eq(0),
	            id = gazeta_pl.Comments.getContainerId($target),
	            mod = gazeta_pl.Comments.containers[id],
	            base = mod.data.opinionsServlet,
	            root = mod.data.root,
	            jspXx = mod.data.xx,
	            commentId = $target.attr('data-id'),
	            permalink = document.location.href.split('?').shift(),
	            uri = base + gazeta_pl.Comments.SERVLET_MORE_CHILD;
	            
	        $(this).parent().remove();
	  
	        if (mod.data.paramPass) {
	            uri = base,
	            uri = uri.replace('id', commentId);
	            uri = uri.replace('action', 'getNewTree');
	            uri = uri.replace('vote', '');
	            uri = uri.replace('callback', '');
	        }
	  
	        $.ajax({
	  
	            url: uri,
	            data: { 
	                id: commentId,
	                firstChildId: $target.find('li.comment:first').attr('data-id'),
	                dzialXx: gazeta_pl.Comments.pageId,
	                root: root,
	                objectId: id,
	                permalinkUrl: permalink,
	                jspXx: jspXx
	            },
	            success: function(json) {
	                gazeta_pl.Comments.update(id, json);
	            }
	  
	        });
	  
	        return false;
	  
	    },
	
	    hideReplyForm: function(id) {
	
	        gazeta_pl.Comments.containers[id].$target.find('section.form[data-dynamic="1"]').each(function() {
	            
	            if (gazeta_pl.Comments.containers[id].$target.hasClass('flex')) { 
	                $(this).parent().find('.inner > footer .reply').show();
	            } else {
	                $(this).parent().find('> footer').show();
	            }
	            
	            $(this).remove();
	        });
	
	    },
	
	    showReplyForm: function(id, commentId) {
	
	        var
	            mod = gazeta_pl.Comments.containers[id],
	            $target = gazeta_pl.Comments.findComment(id, commentId),
	            htm = '<section class="form">' + mod.$target.find('section.form').html() + '</section>',
	            parentId = 0,
	            vparentId = 0,
	            $parentId = null,
	            $vparentId = null,
	            $reply = null,
	            $footer = null,
	            $form = null,
	            author = '',
	            fbCommentChecked = mod.$target.find('.FBComment :checkbox').is(':checked');
	        
	        author = $target.find('> section > article .inner > header > div.c0 > p.author, > section > article > header > div.c0 > p.author').html().replace(/<img.*?>/, '');
	        
	        $footer = $target.find('> section > article .inner > footer, > section > article > footer');
	        if (mod.$target.hasClass('flex')) {
	            
	            $reply = $footer.find('.reply');
	            $form = $footer.parents('li.comment > section').after(innerShiv(htm, false)).prev();           
	            $reply.hide();
	            
	        } else {
	        
	            $form = $footer.before(innerShiv(htm, false)).prev();
	            $footer.hide();
	            
	        };
	        
	        $target.find('.FBComment input').attr('checked',fbCommentChecked);
	        $form.find('p.msg').remove();
	        $form.find('div.vote').remove();
	  
	        $target.find('section.form').attr('data-dynamic', '1');
	  
	        $parentId = $target.find('input[name="oxx"]');
	        $vparentId = $target.find('input[name="voxx"]');
	  
	        vparentId = parseInt($target.attr('data-id'), 10);
	  
	        if ($target.parents('li.comment').length) {
	            parentId = parseInt($target.parents('li.comment').eq(0).attr('data-id'), 10);
	        } else {
	            parentId = parseInt($target.attr('data-id'), 10);
	        }
	  
	        // if (mod.data.tree == '0') {
	            // parentId = 0;
	            // vparentId = 0;
	        // }
	  
	        $parentId.val('' + parentId);
	        $vparentId.val('' + vparentId);
	
	        if (mod.$target.hasClass('flex')) { 
	            $target.find('section.form > header').remove();
	        } else {
	            $target.find('section.form > header').html('Twoja odpowied\u017a:').addClass('reply');
	        }
	        
	        if (!!$target.find('textarea').length) {
	            
	            gazeta_pl.Comments.setPosition(
	                $target.find('textarea').val('@' + $.trim(author.replace(/<.*?>/g, '')) + '\n '),
	                $target.find('textarea').val().length
	            );
	
	            $target.find('textarea').focus();
	        }
	  
	        $target.find('button').after('<a data-action="cancelReply" href="#">anuluj</a>');
	    },
	
	    limitLength: function(id, n, count, moreURI) {
	
	        var 
	            me = gazeta_pl.Comments,
	            container = me.containers[id],
	            $target = null;
	
	        if (!me.containers[id] || me.containers[id].reply) return;
	
	        $target = me.containers[id].$target;
	        while ($target.find('li.comment').length > n) $target.find('li.comment:last').remove();
	
	        if (count > n) {
	            $target.find('> footer').html('<p class="more"><a href="' + moreURI + '">Poka\u017c wszystkie komentarze (' + count + ')</a></p>');
	        }
	
	    },
	
	    onCommentVote: function(e) {
	
	        var 
	            uri = $(this).attr('data-action') == 'upvote' ? gazeta_pl.Comments.SERVLET_UPVOTE : gazeta_pl.Comments.SERVLET_DOWNVOTE,
	            id = gazeta_pl.Comments.getContainerId($(this)),
	
	            mod = gazeta_pl.Comments.containers[id],
	            base = mod.data.opinionsServlet,
	            jspXx = mod.data.xx,
	
	            $target = $(this).parents('li.comment').eq(0),
	            $targetArticle = $(this).parents('li.comment').parent().parent().parent(),
	            $btn = $(this),
	
	            commentId = $target.attr('data-id'),
	            commentRoot = $target.attr('data-id'),
	            articleId = $targetArticle.attr('data-id'),
	            articleRoot = $targetArticle.attr('data-root'),
	            
	            alreadyVoted = function() {
	
	                var 
	                    $parent = $btn.parents('p.vote'),
	                    $span = $btn.parents('p.vote').eq(0).find('span'),
	                    prevText = '';
	
	                if (!$span.length) $parent.prepend($span = $('<span>'));
	
	                prevText = $span.text();
	  
	                if ($span.hasClass('tmp')) return;
	                $span.addClass('tmp').text('ju\u017c ocenia\u0142e(a)\u015b');
	  
	                setTimeout(function() {
	                    $span.removeClass('tmp').text(prevText);
	                }, 2000);
	  
	                return false;
	            },
	            
	            unlock = function() {
	                $target.removeClass('votingLocked');
	            };
	          
	        e.preventDefault();
	        
	        if ($target.hasClass('votingLocked')) return false;
	        if ($target.hasClass('userVoted')) return alreadyVoted();
	
	        $target.addClass('votingLocked');
	
	        if (mod.data.paramPass) {
	            uri = '',
	            base = base.replace('vote', $(this).attr('data-action') == 'upvote' ? '1' : '-1');
	            base = base.replace('id', commentId);
	            base = base.replace('action', 'vote');
	            base = base.replace('callback', '');
	        }
	        
	        $.ajax({
	            url: base + uri,
	            data: { 
	                id: commentId,
	                articleId: articleId,
	                articleRoot: articleRoot,
	                dzialXx: gazeta_pl.Comments.pageId,
	                jspXx: jspXx
	            },
	            success: function(json) {
	
	                unlock();
	
	                if (!json) return;
	
	                if (typeof json.status != 'undefined' && !json.status) {
	                    if (json.reason == 1) {
	                        mod.$target.find('p.voteNeedLogin').css({
	                            display: 'block',
	                            left: $btn.position().left - 100,
	                            top: $btn.position().top - 28
	                        });
	                    } else {
	                        $target.addClass('userVoted');
	                        alreadyVoted();
	                    }
	                    return;
	                }
	
	                $target.addClass('userVoted');
	                gazeta_pl.Comments.update(id, json);
	
	            },
	            error: function() {
	                unlock();
	            }
	        });
	
	        return false;
	    },
	
	    onCommentRemove: function() {
	        var 
	            id = gazeta_pl.Comments.getContainerId($(this)),
	            mod = gazeta_pl.Comments.containers[id],
	            jspXx = mod.data.xx,
	            base = mod.data.opinionsServlet,
	            uri = base + gazeta_pl.Comments.SERVLET_REMOVE;
	        
	        if (confirm('Jeste\u015b pewien, \u017ce ten post powinien by\u0107 skasowany?')) {
	      
	            if (mod.data.paramPass) {
	                uri = base,
	                uri = uri.replace('id', $(this).parents('li.comment').eq(0).attr('data-id'));
	                uri = uri.replace('action', 'trashVote');
	                uri = uri.replace('vote', '');
	                uri = uri.replace('callback', '');
	            }
	      
	            $.ajax({
	                url: uri,
	                data: { 
	                    id: $(this).parents('li.comment').eq(0).attr('data-id'),
	                    dzialXx: gazeta_pl.Comments.pageId,
	                    jspXx: jspXx
	                },
	                success: function(data) {
	                    alert(data.msg);
	                }
	            });
	          
	        }
	      
	        return false;
	    },
	
	    onNeedLoginClose: function() {
	        $(this).parents('p').eq(0).hide();
	        return false;
	    },
	
	    onReply: function() {
	        var
	            $article = $(this).parents('article.mod_comments').eq(0),
	            id = gazeta_pl.Comments.getContainerId($(this)),
	            commentId = $(this).parents('li.comment').eq(0).attr('data-id');
	            
	
	        gazeta_pl.Comments.hideReplyForm(id);
	        gazeta_pl.Comments.showReplyForm(id, commentId);
	        gazeta_pl.Comments.containers[id].reply = true;
	
	        if ($article.hasClass('flex') && $article.attr('data-logged') === "0") {
	
	            var 
	                dataLogin = $article.attr('data-zaloguj'),
	                dataRegister = $article.attr('data-zarejestruj'),
	                $login = $(this).parents('li.comment').find('.form .inline a:first-child'),
	                $register = $(this).parents('li.comment').find('.form .inline a + a'),
	                id = $(this).parents('li.comment').eq(0).attr('data-id');
	           
	            $login.attr('href',dataLogin.replace(/_OPID_/g,id));           
	            $register.attr('href',dataRegister.replace(/_OPID_/g,id));           
	        }
	        return false;
	    },
	    
	    onReplyStart: function() {
	        var 
	            p = $(this).parents('article.mod_comments').eq(0), 
	            htm = '<iframe height="0" width="0" src="/info/elementy/kropka.jsp" style="display:none"></iframe>';
	          
	        if (p.length) {
	            if (p.data('param-pass')) {
	                htm = '<iframe height="0" width="0" src="/info/elementy/kropkaP2.jsp" style="display:none"></iframe>';
	            }
	            p.append(htm);
	            $('article.mod_comments textarea[name="tresc"]').die();
	        }
	    },
	
	    onReplyCancel: function() {
	        
	        var id = gazeta_pl.Comments.getContainerId($(this));
	        
	        gazeta_pl.Comments.hideReplyForm(id);
	        gazeta_pl.Comments.containers[id].reply = false;
	
	        return false;
	    },
	    
	    onReplyChange: function() {
	        var
	            v = $(this).val(),
	            $par = $(this).parents('fieldset.comment').eq(0);
	        
	        if (v.length > gazeta_pl.Comments.MAX_COMMENT_LENGTH) {
	      
	            $(this).val(v = v.substr(0, gazeta_pl.Comments.MAX_COMMENT_LENGTH));
	            
	            gazeta_pl.Comments.setPosition($(this), v.length);
	            $par.find('span.warning').remove();
	            $par.append('<span class="warning">' + gazeta_pl.Comments.MSG_COMMENT_TOO_LONG + '</span>');
	            setTimeout(function() {
	                $par.find('span.warning').remove();
	            }, 2000);
	      
	        }
	    }
	
	}
	
	gazeta_pl.Comments.init();

	
})();

