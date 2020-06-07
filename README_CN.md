# 能量

## 运行

基本上，这个页面是一个Github页面，您可以访问[energy.shaokang.ga](energy.shaokang.ga).

这是一个纯静态的JavaScript页面。所以任何人都可以自己轻松地主持。如果你不需要看一些3d效果，只需下载并点击每个文件就可以了。3D效果需要一些跨服务器的交互。

要运行它并查看3d效果，我使用的方法是安装[Node.js](https://nodejs.org/en/download/)一开始。然后使用`npm install --global http-server`”安装http服务器。然后在任何目录中执行以下操作：

```bash
git clone https://github.com/ShaokangJiang/energy.git
cd energy
http-server

```

然后转到浏览器并转到`127.0.0.1:8080`即可。

## 要求

因为我使用类技术来构建LinkedList以用于生成图表，所以不支持IE。对于大多数浏览器也有一些要求，请参见[NPM官方网站]上的兼容性数据(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Browser_compatibility). 除了LinkedList之外，大多数功能都应该在IE11中工作。

## 使用的JS库 

- [echarts](https://echarts.apache.org/en/index.html)
- [Materialcss](https://materializecss.com/)
- [A-frame](https://aframe.io/)
- [AR.js](https://ar-js-org.github.io/AR.js-Docs/)
- [PapaParse](https://www.papaparse.com/)
- [Jquery](https://jquery.com/)
- [aframe-orbit-controls-component](https://github.com/tizzle/aframe-orbit-controls-component)
- [jsLPSolver](https://github.com/JWally/jsLPSolver)

## 数据格式：

#### 仿真数据

标题应该相同，不需要“用户用法”，但建议使用。每个字段表示接收到的值传感器。

```csv
Time,Wind_Speed,Light_H,Wave_Hight,Wave_Period,Current_Speed,User_Usage
0,5.405,1213.072,3.591,9.104,1.846,501.5935
0.2,8.157,1191.057,3.022,10.431,1.908,497.0755
0.4,6.012,1197.794,1.709,8.784,1.936,503.0145
0.6,6.477,1205.489,2.1,9.857,1.858,499.4511
```

从[此处](https://github.com/ShaokangJiang/energy/blob/master/sample/simulation data.csv)下载示例。

#### 优化数据

标题应该相同，不需要“idx”。每一类都有一个值分量，记录单位时间内产生的功率。每一次计数都意味着发生的可能性。因为我们需要用千瓦时=千瓦时 * 秒/3600来计算产生的能量。计数字段必须是整数。我们可以利用可能性 * 一个因子使它成为整数。每次计数的总和应该是相同的。

```csv
idx,wind_value,wind_count,light_value,light_count,wave_value,wave_count,current_value,current_count
0,4962654.905,189,100.8496541,45,485.3900022,222,71501.61128,105
1,424133.8855,45,105.8598321,124,328.6975665,43,49752.79798,187
2,3414695.961,18,113.1989172,130,438.1380705,33,35910.75581,12
3,7346795.761,90,116.4237558,11,483.7242291,24,48819.12566,25
4,4033868.032,20,105.5786618,25,226.1068017,14,1611.378029,35
5, , ,106.0583865,19,364.8009734,10,19265.12771,1
```

从[此处](https://github.com/ShaokangJiang/energy/blob/master/sample/OptimizationData.csv)下载示例。

## 生成虚假仿真和优化数据

#### 伪造的模拟数据

<!--Analyze data format at here-->

使用下面的 java 代码生成虚假的模拟数据(在运行页面中使用)。

```java
  static Random r = new Random();
  public static void main(String[] args) throws IOException {
    // TODO Auto-generated method stub
    FileWriter a = new FileWriter(new File("1.csv"));
    a.write("Wind_Speed,Light_H,Wave_Hight,Wave_Period,Current_Speed\r\n");
    double time = 0;
    while(time<36) {
      a.write(generateNormalVar(8,2)+","+generateNormalVar(1200,50)+
          ","+generateNormalVar(2.5,0.25)+","+generateNormalVar(9,0.5)+","+generateNormalVar(2,0.5)+"\r\n");
      time+=0.2;
    }
    a.flush();
    a.close();
  }
  
  /**
   * N(a,b)
   * center,distribution
   * @param x
   * @param y
   * @return
   */
  public static String generateNormalVar(double a, double b) {
    double x = Math.sqrt(b)*r.nextGaussian()+a;
    r.nextGaussian();
    return String.format("%.3f", x);
  }
```

#### 虚假的优化数据

- 使输入源易于管理、表示和维护。 我们可以将它们保存在同一个文件中，如果一个单元格没有足够的数据，则将其保留为空将是可行的，并建议使用这种方法。

- Idx 不是必需的，但是推荐使用

- 这一生成代码可能已经足够好了，因为这并不是真实的情况
- header: idx,wind_value,wind_count,light_value,light_count,wave_value,wave_count,current_value,current_count

使用下面的 java 代码生成虚假的优化数据(在开始页面中使用):

```java
  public static void main(String[] args) throws IOException {
    FileWriter a = new FileWriter(new File("1.csv"));
  a.write("idx,wind_value,wind_count,light_value,light_count,wave_value,wave_count,current_value,current_count\r\n");
    int count = 0;
    int year = 365;
    int wind_count=year,light_count=year,wave_count=year,current_count=year;
    while(wind_count>0 || light_count>0 || wave_count>0 || current_count>0 ) {
      int wind_count_=generateRandomIntegerIn(wind_count),light_count_=generateRandomIntegerIn(light_count),
          wave_count_=generateRandomIntegerIn(wave_count),current_count_=generateRandomIntegerIn(current_count);
      wind_count -= wind_count_;
      light_count -= light_count_;
      wave_count -= wave_count_;
      current_count -= current_count_;
      if(wind_count_==0&&light_count_==0&&wave_count_==0&&current_count_==0) continue;
      double Wind_Speed=generateRandomDoubleIn(4,15),Light_H=generateRandomDoubleIn(1100,1300),
          Wave_Hight=generateRandomDoubleIn(2,3),Wave_Period=generateRandomDoubleIn(7,11),
          Current_Speed=generateRandomDoubleIn(1,3);
      System.out.println(count+""+wind_count+""+light_count+""+wave_count+""+current_count+"");
      a.write(count + ","+ (wind_count_ == 0 ? " " : 2866*Wind_Speed*Wind_Speed*Wind_Speed) +","+(wind_count_ == 0 ? " " : wind_count_) +","+
            (light_count_ == 0 ? " " : 0.09*Light_H) +","+(light_count_ == 0 ? " " : light_count_) +","+
          (wave_count_ == 0 ? " " : 6.6*Wave_Hight*Wave_Hight*Wave_Period)+","+(wave_count_ == 0 ? " " : wave_count_)+","+
            (current_count_ == 0 ? " " : 1254*Current_Speed*Current_Speed*Current_Speed )+","+(current_count_ == 0 ? " " : current_count_)+"\r\n");
      count++;
    }
    a.flush();
    a.close();
  }
  
  //0~h
  public static int generateRandomIntegerIn(int h) {
    return ThreadLocalRandom.current().nextInt(0, h + 1);
  }
  
  public static double generateRandomDoubleIn(int Min, int Max) {
    return Min + (Math.random() * ((Max - Min) + 1));
  }
  
```

## 变更日志

1. 2020.5.25 核心运行功能完成，输入模拟文件中不需要时间字段

2. 2020.5.26 新增多语言

3. 2020.5.27 优化字体和图标加载

4. 2020.5.29 添加最佳历史结果函数的优化

5. 2020.5.30 用户现在可以使用前30秒的数据来运行和优化阈值

6. 2020.5.31 进一步核实，通知补充。显示虚拟现实和增强现实的框架已经准备好。支持通过[静态网页](https://energy.shaokang.ga/test.html),[扫码](https://energy.shaokang.ga/qr.png)对于静态页面中的AR，您的设备需要满足WebXR要求：

   对于静态页面中的AR，您的设备需要满足WebXR要求：

   > AR也是一个标准，你今天可以在**Android ARCore兼容**设备和**Chrome 79**或更新版本上进行实验。
   > 在中启用实验性WebXR AR模块**chrome://flags**

7. 2020.6.6 所有3d部分均已完成