def get_corners(uLevel):
        verts = 0
        numLayers = 1 << uLevel
        sub_tri_height = 1.0 / float(numLayers)
        max_t = 1.0

        for i in range(0, numLayers):
                t_bot = max_t - sub_tri_height
                smax_top = 1. - max_t;
                smax_bot = 1. - t_bot;
                nums = i + 1;
                if smax_top == 0:
                        ds_top = 0.0
                else:
                        s_top = smax_top / float( nums - 1 )
                if smax_bot == 0:
                        ds_bot = 0.0
                else:
                        ds_bot = smax_bot / float( nums );
                s_top = 0.;
                s_bot = 0.;
                
                for j in range(0, nums):
                        print "Vertex [" + str(i) + "][" + str(j) + "]: s = " + str(s_bot) + ", t = " + str(t_bot)
                        print "Vertex [" + str(i) + "][" + str(j) + "]: s = " + str(s_top) + ", t = " + str(max_t)
                        s_top += ds_top;
                        s_bot += ds_bot;
                        verts += 2
                
                
                print "Vertex [" + str(i) + "][" + str(j) + "]: s = " + str(s_bot) + ", t = " + str(t_bot)
                max_t = t_bot;
                t_bot -= sub_tri_height;
                verts += 1
        print str(verts) + " vertices"
