//#include <sys/types.h>
#include <sys/socket.h>
#include <stdio.h>
//#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>
#include <stdlib.h>
// #include <fcntl.h>
//#include <sys/shm.h>
#include <time.h>

#define MYPORT  9999
#define BUFFER_SIZE 1024

int main()
{
    ///定义sockfd
    int sock_cli = socket(AF_INET,SOCK_STREAM, 0);

    ///定义sockaddr_in
    struct sockaddr_in servaddr;
    memset(&servaddr, 0, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(MYPORT);  ///服务器端口
    //servaddr.sin_addr.s_addr = inet_addr("127.0.0.1");  ///服务器ip
    servaddr.sin_addr.s_addr = inet_addr("192.168.0.1");  ///服务器ip

    ///连接服务器，成功返回0，错误返回-1
    if (connect(sock_cli, (struct sockaddr *)&servaddr, sizeof(servaddr)) < 0)
    {
        perror("connect");
        exit(1);
    }

    // char s[]="1223";
    // send(sock_cli,s,strlen(s),0);

    srand(time(NULL));
    int m=rand()%500;
    char s[4];
    sprintf(s,"%d", m);
    send(sock_cli,s, strlen(s), 0);

    close(sock_cli);
    return 0;
}
