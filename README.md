# energy

[中文](https://github.com/ShaokangJiang/energy/blob/master/README_CN.md).

## Running

Basically, this page is served as a Github page, you could visit at [energy.shaokang.ga](energy.shaokang.ga).

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

