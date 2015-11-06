/**
 * Created by MikaSez on 27/10/2015.
 */
$(document).ready(function () {
    var imagesArray = [],
        debug = false;
    function getImagesFromTumblr(blogName, imgArr, imgCount, callback, makeOffset) {
        var offsetStep = 200,
            makeOffset = typeof makeOffset !== 'undefined' ? makeOffset : 0,
            imgCount = typeof imgCount !== 'undefined' ? imgCount : 5;
        $.ajax({
            type: 'GET',
            url: 'http://api.tumblr.com/v2/blog/' + blogName + '.tumblr.com/posts',
            dataType: 'jsonp',
            data: {
                api_key: 'P1M2xgqzN8Q5V9Oh1eMp2a6V2YceKV5Z7FvlPZlWgDXvPT6AMs',
                offset: makeOffset

            }, success: function (data) {
                if (debug) console.log('Makeing request with offset = %d', makeOffset);
                if (data.meta.status === 200) { // if answer is 'ok'
                    $.each(data.response.posts, function () {
                        if (this.type === 'photo') {
                            $.each(this.photos, function () {
                                var ext = this.original_size.url.split('.').pop();
                                if ((ext === 'jpg') && (this.original_size.width >= 640)) {
                                    if (imgArr.length < imgCount) {
                                        imgArr.push(this);
                                    }
                                }
                            });
                        }
                    });
                }
                if (imgArr.length < imgCount)
                    getImagesFromTumblr(
                        blogName,
                        imgArr,
                        imgCount,
                        callback,
                        ((makeOffset === 0) ? offsetStep : makeOffset + offsetStep)
                    );
                else if ($.isFunction(callback)) callback(true);

            }, error: function () {
                if (debug) console.error('Error try ajax request');
                if ($.isFunction(callback)) callback(false);
            }
        });
    }


    if (debug) console.time('Getting Tumblr Images Data');
    getImagesFromTumblr('we-love-rain', imagesArray, 65, function (noerror) {
        if (debug) console.timeEnd('Getting Tumblr Images Data');
        function getArrayItem(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        function preloadImg(url, callback) {
            var pImg = new Image();
            pImg.onload = function () {
                if ($.isFunction(callback)) callback(true);
            };
            pImg.src = url;
        }

        if (debug) console.log(imagesArray);
        if (imagesArray.length > 0) {

            var imageUrl = getArrayItem(imagesArray).original_size.url;
            if (debug) console.log('Random image url: %s', imageUrl);

            if (debug) console.time('Image downloading');
            preloadImg(imageUrl, function () {
                if (debug) console.timeEnd('Image downloading');
                $('#bg-fullscreen').css({
                    'background-image': 'url(' + imageUrl + ')'
                }).addClass('show');
            });
        }
    });

});