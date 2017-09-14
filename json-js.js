var friend={
    firstName: 'Good',
    'lastName': 'Man',
    'address': undefined,
    'name': null,
    'Boolean': false,
    'num1': 0.0,
    'num2': 0.01,
    'phone': ["1234567",undefined, function(){}],
    'fullName': function(){
        return this.firstName + ' ' + this.lastName;
    }
};
JSON.stringify(friend);//返回一个字符串
// {
//     "firstName": "Good",
//     "lastName": "Man",
//     "name": null,
//     "Boolean": false,
//     "num1": 0,
//     "num2": 0.01,
//     "phone": ["1234567", null,null]
// }


// 对比内容	        JSON	                                JS对象
// 键名     	    必须是加双引号	                        可允许不加、加单引号、加双引号
// 属性值	        只能是数值（10进制）、
//                 字符串（双引号）、布尔值和null，
//                 也可以是数组或者符合JSON要求的对象，         爱啥啥
//                 不能是函数、NaN, Infinity,
//                 -Infinity和undefined
// 逗号问题	        最后一个属性后面不能有逗号	                 可以
// 数值	            前导0不能用，小数点后必须有数字              没限制

// 1. 将JS数据结构转化为JSON字符串 —— JSON.stringify  用法: JSON.stringify(value[, replacer [, space]])  ***返回为字符串
// 1.1 基本使用 —— 仅需一个参数
// JSON.stringify({"name":"Good Man","age":18})    返回一个字符串    "{"name":"GoodMan","age":18}"
// 1.2 第二个参数可以是函数，也可以是一个数组
//      - 如果第二个参数是一个函数，那么序列化过程中的每个属性都会被这个函数转化和处理
//      - 如果第二个参数是一个数组，那么只有包含在这个数组中的属性才会被序列化到最终的JSON字符串中
//      - 如果第二个参数是null，那作用上和空着没啥区别，但是不想设置第二个参数，只是想设置第三个参数的时候，就可以设置第二个参数为null
        // (1) 这第二个参数若是函数
//         如果制定了第二个参数是函数，那么这个函数必须对每一项都有返回，这个函数接受两个参数，
//       一个键名，一个是属性值，函数必须针对每一个原来的属性值都要有新属性值的返回
      var obj1 = {
            "firstName": "Good",
            "lastName": "Man",
            "age": 18,
            "phone": "18001164476"
      };

      var obj1After = JSON.stringify(obj1, function (key, value) {
          if (key === "phone") {
              return "(000)" + value;
          }
          else if (typeof value === "number") {
              return value + 10;
          }
          else {
              return value;
          }
      });
      console.log(obj1After);//{"firstName":"Good","lastName":"Man","age":28,"phone":"(000)18001164476"}

        // (2) 第二个参数是数组
        // 如果第二个参数是一个数组，那么只有在数组中出现的属性才会被序列化进结果字符串，
        // 只要在这个提供的数组中找不到的属性就不会被包含进去，
        // 而这个数组中存在但是源JS对象中不存在的属性会被忽略，不会报错
        var obj2 = {
            "firstName": "Good",
            "lastName": "Man",
            "age": 18,
            "phone": "18001164476"
        };

        //注意下面的数组有一个值并不是上面对象的任何一个属性名
        var obj2After = JSON.stringify(obj2, ["firstName", "address", "phone"]);

        console.log(obj2After); //{"firstName":"Good","phone":"18001164476"}

        // (3) 第三个参数用于美化输出 —— 不建议用
        // 指定缩进用的空白字符，可以取以下几个值：
        //     - 是1-10的某个数字，代表用几个空白字符
        //     - 是字符串的话，就用该字符串代替空格，最多取这个字符串的前10个字符
        //     - 没有提供该参数 等于 设置成null 等于 设置一个小于1的数

            var obj3={
                "firstName": "Good",
                "lastName": "Man",
                "phone":{"home":"1234567","work":"7654321"}
            };
            //直接转化是这样的：
            //{"firstName":"Good","lastName":"Man","phone":{"home":"1234567","work":"7654321"}}
            var obj3After=JSON.stringify(obj3, null, 4);
            console.log(obj3After);
            /*
            //前面多了4个空格字符
            {
                "firstName": "Good",
                "lastName": "Man",
                "phone": {
                    "home": "1234567",
                    "work": "7654321"
                }
            }
            */
            var obj3xAfter=JSON.stringify(obj3, null, "HAHAHAHA");
            console.log(obj3xAfter);
            /*
            {
            HAHAHAHA"firstName": "Good",
            HAHAHAHA"lastName": "Man",
            HAHAHAHA"phone": {
            HAHAHAHAHAHAHAHA"home": "1234567",
            HAHAHAHAHAHAHAHA"work": "7654321"
            HAHAHAHA}
            }
            */
            var obj3yAfter=JSON.stringify(obj3, null, "WhatAreYouDoingNow");
            console.log(obj3yAfter);
            /* 最多只取10个字符
            {
            WhatAreYou"firstName": "Good",
            WhatAreYou"lastName": "Man",
            WhatAreYou"phone": {
            WhatAreYouWhatAreYou"home": "1234567",
            WhatAreYouWhatAreYou"work": "7654321"
            WhatAreYou}
            }
            */


        // (4) 注意这个函数(重要)
        //     - 键名不是双引号的（包括没有引号或者是单引号），会自动变成双引号；字符串是单引号的，会自动变成双引号
        //     - 最后一个属性后面有逗号的，会被自动去掉
        //     - 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中(非数组顺序会变化)
        //     - 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值
        //     - undefined、任意的函数（其实有个函数会发生神奇的事，后面会说）以及 symbol 值（symbol详见ES6对symbol的介绍）
        //        -- 出现在非数组对象的属性值中：在序列化过程中会被忽略
        //        -- 出现在数组中时：被转换成 null
        JSON.stringify({x: undefined, y: function (){return 1;}, z: Symbol("")}); //出现在非数组对象的属性值中被忽略："{}"
        JSON.stringify([undefined, Object, Symbol("")]); //出现在数组对象的属性值中，变成null："[null,null,null]"
        //     - NaN、Infinity和-Infinity，不论在数组还是非数组的对象中，都被转化为null
        //     - 所有以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们
        //     - 不可枚举的属性会被忽略

// 2. 将JSON字符串解析为JS数据结构 —— JSON.parse  表达式: JSON.parse(text[, reviver])
//         如果第一个参数，即JSON字符串不是合法的字符串的话，那么这个函数会抛出错误，
//         所以如果你在写一个后端返回JSON字符串的脚本，最好调用语言本身的JSON字符串相关序列化函数，
//         而如果是自己去拼接实现的序列化字符串，那么就尤其要注意序列化后的字符串是否是合法的，
//         合法指这个JSON字符串完全符合JSON要求的严格格式。

        // 值得注意的是这里有一个可选的第二个参数，这个参数必须是一个函数，这个函数作用在属性已经被解析但是还没返回前，将属性处理后再返回。
    var friends={
        "firstName": "Good",
        "lastName": "Man",
        "phone": {"home": "1234567", "work": ["7654321", "999000"]}
    };
    //我们先将其序列化
    var friendsAfter=JSON.stringify(friends); //'{"firstName":"Good","lastName":"Man","phone":{"home":"1234567","work":["7654321","999000"]}}'
    //再将其解析出来，在第二个参数的函数中打印出key和value
    JSON.parse(friendsAfter, function (k,v){
        console.log(k);
        console.log(v);
        console.log("----");
    });
    /*
        firstName    Good  ----
        lastName    Man    ----
        home    1234567    ----
        0    7654321    ----
        1    999000    ----
        work    [ , ]    ----
        phone    {}    ---
        {}    ----
    */
    // 对于复合属性来说的，遍历的时候，从头到尾进行遍历，如果是简单属性值（数值、字符串、布尔值和null），那么直接遍历完成，
    // 如果是遇到属性值是对象或者数组形式的，那么暂停，先遍历这个子JSON，而遍历的原则也是一样的，等这个复合属性遍历完成，那么再完成对这个属性的遍历返回

// 有两点需要注意：
//     如果 reviver 返回 undefined，则当前属性会从所属对象中删除，如果返回了其他值，则返回的值会成为当前属性新的属性值。
//     你可以注意到上面例子最后一组输出看上去没有key，其实这个key是一个空字符串，而最后的object是最后解析完成对象，因为到了最上层，已经没有真正的属性了


// 3. 影响 JSON.stringify 的神奇函数 —— object.toJSON
//     JS对象上实现了 toJSON方法，那么调用 JSON.stringify去序列化这个JS对象时， JSON.stringify会把这个对象的 toJSON方法返回的值作为参数去进行序列化
var info={
    "msg": "I Love You",
    "toJSON": function (){
        var replaceMsg = new Object();
        replaceMsg["msg"] = "Go Die";
        return replaceMsg;
    }
};
console.log(JSON.stringify(info)); //"{"msg":"Go Die"}",没有忽略
// 其实 Date类型可以直接传给 JSON.stringify做参数，其中的道理就是， Date类型内置了 toJSON方法








