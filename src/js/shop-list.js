require(["require.config"], function () {
    require(["url", "template", "header", "footer"], function (url, template) {
        class Shoplist {
            constructor() {
                console.log(123);
                this.shopdata().then((list) => {
                    this.ascend(list);
                    this.descen(list);
                    this.screen(list);

                })
            }
            shopdata() {
                return new Promise(resolve => {
                    $.ajax({
                        //请求地址
                        url: url.baseUrl + "/list/get",
                        //请求方式
                        method: "GET",
                        //请求格式
                        dataType: "json",
                        //回调
                        success: function (res) {
                            console.log(res)
                            if (res.res_code === 1) {
                                let list = res.res_body.data.list;
                                //获取到的数据通过template模板赋值
                                let Tat = template("cart-shop", { list })
                                $("#cart-det").html(Tat);
                                resolve(list)
                            }
                        }
                    })
                })

            }
            // 升序
            ascend(list) {
                this.list = list;
                // console.log(this.list)
                let _this = this
                $("#asce-order").on("click", function () {
                    let list = _this.list.sort((a, b) => {
                        return a.price - b.price;
                    })
                    let Tat = template("cart-shop", { list })
                    $("#cart-det").html(Tat);
                })
            }
            //  降序
            descen(list) {
                this.list = list;
                let _this = this
                $("#desc-order").on("click", function () {
                    let list = _this.list.sort((a, b) => {
                        return b.price - a.price;
                    })
                    let Tat = template("cart-shop", { list })
                    $("#cart-det").html(Tat);
                })
            }
            screen(list) {
                this.list = list;
                var _this = this;
                $("#screen").on("click", "a", function () {
               
                    let val = this.innerHTML;
                     this.priceNum = val.split("~");
                  let shop=   _this.list.filter(list => {
                       
                         return  list.price > this.priceNum[0] && list.price < this.priceNum[1];
                    })
                    let Tat = template("cart-shop", { list:shop })
                    $("#cart-det").html(Tat);
                    _this.descen(shop);
                    _this.screen(shop);
                })
            }
        }
        new Shoplist();
    })
})