package day2 2;

public class count {import java.util.Scanner;
class count {
    public static void main(String[] args){
        Scanner a = new Scanner(System.in);
        int b = a.nextInt();
        int counteven =0;
        int countodd= 0;
        for(int i=0;i<=b;i++){
            int c=a.nextInt();
            if(c%2==0){
                counteven = counteven + 1;
            }
            else
                countodd = countodd +1;


        }
        System.out.print("even count ="+counteven);
        System.out.print("odd count"+countodd);
    }\\hello world
    
    
}


    
}
