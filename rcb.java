import java.util.Scanner;
class RCB {
    public static void main(String[] args) {
      //  System.out.println("roopesh");
       /* Scanner a=new Scanner(System.in);
        int m=a.nextInt();
        int n=a.nextInt();
      for(int i=m;i<=n;i++){
        if(i%3==0 && i%5==0){
            System.out.println("RCB");
        }
        else if(i%3==0){
            System.out.println("RC");
        }
        else if(i%5==0){
            System.out.println("B");
        }
        else{
            System.out.println(i);
        }
    }
   // array                                                                                                                                                                                                                     ;
   Scanner a = new Scanner(System.in);
   int[] b = new int [5];
   for(int i=0;i<5;i++){
    b[i] = a.nextInt();
    
   }
   for(int i=0;i<5;i++){
   System.out.println(b[i]);
   }

 {
    Scanner si = new Scanner(System.in);
    int a = si.nextInt();
    int[] arr = new int[a];
    for(int i=0;i<a-1;i++){
        arr[i]=si.nextInt();

    }
    
    // switch case:
    Scanner a= new Scanner(System.in);
    char b = a.next().charAt(0);
    b = Character.toLowerCase(b);
    switch(b){
    case 'R':
        System.out.print("STOP");
        break;
    case 'Y':
        System.out.print("READY");
        break;
    case 'G':
        System.out.print("GO");
        break;
    default:
        System.out.print("INVALID SIGNAL");          
        
    
    Scanner a = new Scanner(System.in);
    String b = a.nextLine();
    switch(b){
        case "MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY":
            System.out.print("weekdays");
            break;
        case "SATURDAY","SUNDAY":
            System.out.print("weekend");
            break;
        default:
            System.out.print("invalid entry");  



    }
     
    Scanner a = new Scanner(System.in);
    int b = a.nextInt();
    switch(b){
        case 1:
            System.out.print("JANUARY");
            break;
        case 2:
            System.out.print("FEB");
            break;
        case 3:
            System.out.print("march");
            break;
        case 4:
            System.out.print("april");
            break;
        case 5:
            System.out.print("may");

            break;
        case 6:
            System.out.print("june");
            break;
        case 7:
            System.out.print("july");
            break;
        case 8:
            System.out.print("aug");
            break;
        case 9:
            System.out.print("sep");
            break;
        case 10:
            System.out.print("oct");
            break;
        case 11:
            System.out.print("nov");
            break;
        case 12:
            System.out.print("dec");
            break;
        default:
            System.out.print("invalid month");



    }  
    Scanner a = new Scanner (System.in);
    int b = a.nextInt();
    int positivecount=0 ;
    int negativecount=0;
    int zerocount=0;

    for(int i = 1; i <= b; i++){
        int c = a.nextInt();
        if(c>=1){
            
            positivecount= positivecount+1;
        }
        else if(c<0){
           ;
            negativecount= negativecount+1;
        }
        else{
            
            zerocount= zerocount+1;
        }
        
    }
    System.out.println("positive count is: "+(double)positivecount/b);
    System.out.println("negative count is: "+(double)negativecount/b);
    System.out.println("zero count is: "+(double)zerocount/b);

     
    Scanner a= new Scanner(System.in);
    int n = a.nextInt();
    for(int i=1;i<=n;i++){
        System.out.println(i);
    }

     */
        
    // to import random number we can write" import java.util.Random" ;
    
    // class and object:
        

    }
    /*public class addition{
    
        int a = 10;
        int b = 20;
        
    
    void sum(){
     System.out.print(a
        +b);

    }
    public static void main(String[]args){
        addition f= new addition();
        f.sum();


    }
}*/
import java.util.Scanner;
public class find {
    void Rds(int a){
        if(a%2==0){
           System.out.print("even");
        }
        else{
            System.out.print("odd");
        }


    }

public static void main(String[] args){
find h = new find();
Scanner scan = new Scanner(System.in);
int f2 = scan.nextInt();
h.Rds(f2);
scan.close();
}}
  
   


   

}

