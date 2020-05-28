# 能量

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
