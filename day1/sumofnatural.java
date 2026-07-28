import java.util.Scanner;
public class sumofnatural {
    public static void main(String[]args){
        Scanner a = new Scanner(System.in);
        int b = a.nextInt();
        int sum=0;
        do{
            sum=sum+b;
            b--;
        }while(b>0);
        System.out.print("sum ="+sum);
    }

}
