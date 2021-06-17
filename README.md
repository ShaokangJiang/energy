# energy

[中文](https://github.com/ShaokangJiang/energy/blob/master/README_CN.md).

## Running

Basically, this page is served as a Github page, you could visit at [shaokangjiang.github.io/energy/](shaokangjiang.github.io/energy/).

This is a pure static page with JavaScript. So anybody is able to host it easily on your own. If you don't need to see some 3d effects, just download and click on each file would work. 3D effects require some cross-server interaction. 

To run it and see the 3d effects, the way I use is to install [Node.js](https://nodejs.org/en/download/) at first. Then install the http-server using `npm install --global http-server`. Then do the following in any directory:

```bash
git clone https://github.com/ShaokangJiang/energy.git
cd energy
http-server
```

Then go to browser and go to `127.0.0.1:8080` should work.

## Requirement

Because I used the class technique to build LinkedList to use in generating charts, IE is not supported. And there are some requirements for the majority browser as well, see compatibility data at [NPM official site](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Browser_compatibility). Other than the LinkedList, most of features should work in IE 11.

## JS libraries used

- [echarts](https://echarts.apache.org/en/index.html)
- [Materialcss](https://materializecss.com/)
- [A-frame](https://aframe.io/)
- [AR.js](https://ar-js-org.github.io/AR.js-Docs/)
- [PapaParse](https://www.papaparse.com/)
- [Jquery](https://jquery.com/)
- [aframe-orbit-controls-component](https://github.com/tizzle/aframe-orbit-controls-component)
- [jsLPSolver](https://github.com/JWally/jsLPSolver)

## Data format:

#### Simulation data

Header should be the same, `User_Usage` is not required but recommend. Each field represent the value sensor received. 

```csv
Time,Wind_Speed,Light_H,Wave_Hight,Wave_Period,Current_Speed,User_Usage
0,5.405,1213.072,3.591,9.104,1.846,501.5935
0.2,8.157,1191.057,3.022,10.431,1.908,497.0755
0.4,6.012,1197.794,1.709,8.784,1.936,503.0145
0.6,6.477,1205.489,2.1,9.857,1.858,499.4511
```

Download a sample from [here](https://github.com/ShaokangJiang/energy/blob/master/sample/simulation%20data.csv).

#### Optimization data

Header should be the same, `idx` is not required. Each category has a value component recoding the amount of power produced in unit time. Each count means the possibility of happening. Because we need to use a KWH = b KW * s/3600 to calculate energy produced. The count field has to be integer. We could use the possibility * a factor to make it become integer. And the sum of each count should be the same. 

```csv
idx,wind_value,wind_count,light_value,light_count,wave_value,wave_count,current_value,current_count
0,4962654.905,189,100.8496541,45,485.3900022,222,71501.61128,105
1,424133.8855,45,105.8598321,124,328.6975665,43,49752.79798,187
2,3414695.961,18,113.1989172,130,438.1380705,33,35910.75581,12
3,7346795.761,90,116.4237558,11,483.7242291,24,48819.12566,25
4,4033868.032,20,105.5786618,25,226.1068017,14,1611.378029,35
5, , ,106.0583865,19,364.8009734,10,19265.12771,1
```

Download a sample from [here](https://github.com/ShaokangJiang/energy/blob/master/sample/OptimizationData.csv).

## Generate Fake Simulation and optimization data 

#### Fake simulation data

<!--Analyze data format at here-->

Use java code below to generate fake simulation data(to be used in run page). 

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

#### Fake optimization data

- To make the input source be easy to manage, represent and maintain. We could save them in the same file, if no enough data for a cell, leave it empty would be fine and recommended. 

- idx is not required but recommended

- This generation code might be good enough as this is not the real case
- header: idx,wind_value,wind_count,light_value,light_count,wave_value,wave_count,current_value,current_count

Use java code below to generate fake optimization data(to be used in start page):

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

## ChangeLog

1. 5/25/2020 Core running function finished & Time field in input simulation file is not required	

2. 5/26/2020 Multi-language added

3. 5/27/2020 Optimize font and icon loading

4. 5/29/2020 Optimization to find best history result function added & multi-file reading is not allowed in run page now

5. 5/30/2020 User can now use the first 30 seconds of data to run and optimize threshold.

6. 5/31/2020 More verification, notification added. Framework for displaying VR and AR is ready. Supported via [static webpage](https://shaokangjiang.github.io/energy/test.html), [qrCode](https://shaokangjiang.github.io/energy/qr.png), and also in running page.

   For AR in static page, your device needs meet WebXR requirement:

   > AR is also a standard and you can experiment today on **Android ARCore compatible** devices and **Chrome 79** or newer.
   > Enable the experimental WebXR AR module in **chrome://flags**

7. 6/6/2020 All parts of 3d model is done.
