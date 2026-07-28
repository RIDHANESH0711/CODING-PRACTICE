import java.util.Scanner;
public class factorial {
 public static void main(String[]args){
    Scanner a = new Scanner(System.in);
    int b = a.nextInt();
    int fac=1;
    while(b!=0){
        fac=fac*b;
        b--;


    }
    System.out.print("factorial ="+fac);

    }


}
